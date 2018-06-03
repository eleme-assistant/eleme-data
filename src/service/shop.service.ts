import { Injectable, HttpService } from '@nestjs/common';
import { BaseService } from './base.service';
import { ShopDao } from '../dao';
import { CreateShopDto } from '../dto';
import { Observable, from } from 'rxjs';
import { AxiosResponse } from 'axios';
import { IEleme } from '../interface/eleme.interface';
import { Moment, _ } from '../common';
import * as Config from 'config';
import { FoodService } from './food.service';

@Injectable()
export class ShopService extends BaseService {

    constructor(
        private readonly httpService: HttpService,
        private readonly shopDao: ShopDao,
        private readonly foodService: FoodService,
    ) { super(); }

    protected async getElemeFoodData(elemeShopId: number): Promise<IEleme.Food[]> {
        const menus = await this.getElemeMenuData(elemeShopId);
        let foods: IEleme.Food[] = [];
        for (const menu of menus) {
            foods = _.union(foods, menu.foods);
        }
        return foods;
    }

    protected async getElemeMenuData(elemeShopId: number): Promise<IEleme.Menu[]> {
        const cookie = Config.get('eleme.cookie');
        const url = 'https://www.ele.me/restapi/shopping/v2/menu';
        const params = {
            restaurant_id: elemeShopId,
            terminal: 'web',
        };
        const res = await this.httpService.get(url, {
            headers: {
                Cookie: cookie,
            },
            params,
        }).toPromise();
        return res.data;
    }

    protected async getElemeShopData(dto: CreateShopDto, limit: number, offset: number): Promise<IEleme.Shop[]> {
        const cookie = Config.get('eleme.cookie');
        const url = 'https://www.ele.me/restapi/shopping/restaurants';
        const params = {
            'extras[]': 'activities',
            'geohash': 'wtw3q54syupy',
            'latitude': dto.latitude,
            'limit': limit,
            'longitude': dto.longitude,
            'offset': offset,
            'restaurant_category_ids[]': -102,
            'sign': 1527924670322,
            'terminal': 'web',
        };
        const res = await this.httpService.get(url, {
            headers: {
                Cookie: cookie,
            },
            params,
        }).toPromise();
        return res.data;
    }

    public async createMany(dto: CreateShopDto) {
        let shops: IEleme.Shop[] = [];
        let count = 1;
        do {
            shops = await this.getElemeShopData(dto, count * 30, (count - 1) * 30);
            for (const shop of shops) {
                const mshop = await this.shopDao.createOrUpdateOne({
                    elemeShopId: shop.id,
                    day: Moment().format('YYYY-MM-DD'),
                }, {
                        data: shop,
                        elemeShopName: shop.name,
                        elemeShopId: shop.id,
                        day: Moment().format('YYYY-MM-DD'),
                    }, {
                        data: shop,
                        elemeShopName: shop.name,
                    });
                await this.foodService.createMany(mshop);
            }
            console.log(`第${count}次, 处理了${shops.length}个店铺`);
            count++;
        } while (!_.isEmpty(shops));
    }

}
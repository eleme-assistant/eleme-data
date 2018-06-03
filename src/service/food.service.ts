import { Injectable, HttpService } from '@nestjs/common';
import { BaseService } from './base.service';
import { FoodDao } from '../dao';
import { CreateShopDto } from '../dto';
import { Observable, from } from 'rxjs';
import { AxiosResponse } from 'axios';
import { IEleme } from '../interface/eleme.interface';
import { Moment, _ } from '../common';
import * as Config from 'config';
import { IAttribute } from 'interface';

@Injectable()
export class FoodService extends BaseService {

    constructor(
        private readonly httpService: HttpService,
        private readonly foodDao: FoodDao,
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

    public async createMany(shop: IAttribute.MShop) {
        const foods = await this.getElemeFoodData(shop.elemeShopId);
        for (const food of foods) {
            await this.foodDao.createOrUpdateOne({
                elemeShopId: shop.elemeShopId,
                day: Moment().format('YYYY-MM-DD'),
                elemeFoodId: food.item_id,
            }, {
                    data: food,
                    name: food.name,
                    elemeFoodId: food.virtual_food_id,
                    elemeShopName: shop.elemeShopName,
                    elemeShopId: shop.elemeShopId,
                    shopId: shop.id,
                    day: Moment().format('YYYY-MM-DD'),
                }, {
                    data: food,
                    elemeShopName: shop.elemeShopName,
                });
        }
        console.log(`处理了${shop.elemeShopName}店里的${foods.length}个食物`);
    }

}
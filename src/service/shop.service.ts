import { Injectable, HttpService } from '@nestjs/common';
import { BaseService } from './base.service';
import { ShopDao } from '../dao';
import { CreateShopDto } from '../dto';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { IEleme } from '../interface/eleme.interface';
import { Moment, _ } from '../common';
import * as Config from 'config';

@Injectable()
export class ShopService extends BaseService {

    constructor(
        private readonly httpService: HttpService,
        private readonly shopDao: ShopDao,
    ) { super(); }

    protected async getElemeData(dto: CreateShopDto, limit: number, offset: number): Promise<AxiosResponse<IEleme.Shop[]>> {
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
        return await this.httpService.get(url, {
            headers: {
                Cookie: cookie,
            },
            params,
        }).toPromise();
    }

    public async createMany(dto: CreateShopDto) {
        let shops: IEleme.Shop[] = [];
        let count = 1;
        do {
            const res = await this.getElemeData(dto, count * 30, (count - 1) * 30);
            shops = res.data;
            for (const shop of shops) {
                await this.shopDao.createOrUpdateOne({
                    elemeId: shop.id,
                    day: Moment().format('YYYY-MM-DD'),
                }, {
                        data: shop,
                        elemeName: shop.name,
                        elemeId: shop.id,
                        day: Moment().format('YYYY-MM-DD'),
                    }, {
                        data: shop,
                        elemeName: shop.name,
                    });
            }
            console.log(`第${count}次, 处理了${shops.length}个店铺`);
            count++;
        } while (!_.isEmpty(shops));
    }

}
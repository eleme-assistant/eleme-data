import { Module } from '@nestjs/common';
// import { TypeormModule } from './typeorm.module';
import { MongodbModule } from './mongodb.module';
import { TestDao, ShopDao, FoodDao } from '../dao';

@Module({
    imports: [MongodbModule],
    providers: [TestDao, ShopDao, FoodDao],
    exports: [TestDao, ShopDao, FoodDao],
})
export class DaoModule { }

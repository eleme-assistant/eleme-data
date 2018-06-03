import { Module } from '@nestjs/common';
// import { TypeormModule } from './typeorm.module';
import { MongodbModule } from './mongodb.module';
import { TestDao, ShopDao } from '../dao';

@Module({
    imports: [MongodbModule],
    providers: [TestDao, ShopDao],
    exports: [TestDao, ShopDao],
})
export class DaoModule { }

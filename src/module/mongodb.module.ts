import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import * as config from 'config';
import { TestScheme, ShopScheme } from '../database/scheme';

const mongodb: { url: string } = config.get('database.mongodb');

const Orm = [
    MongooseModule.forRoot(mongodb.url),
    MongooseModule.forFeature([
        { name: 'test', schema: TestScheme },
        { name: 'shop', schema: ShopScheme },
    ]),
];

@Module({
    imports: Orm,
    exports: Orm,
})
export class MongodbModule { }

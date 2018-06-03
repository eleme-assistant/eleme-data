import { Module, HttpModule } from '@nestjs/common';
import { TestService, ShopService, FoodService } from '../service/index';
import { DaoModule } from './dao.module';

@Module({
    imports: [DaoModule, HttpModule],
    providers: [TestService, ShopService, FoodService],
    exports: [TestService, ShopService, FoodService],
})

export class ServiceModule { }

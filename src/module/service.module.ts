import { Module, HttpModule } from '@nestjs/common';
import { TestService, ShopService } from '../service/index';
import { DaoModule } from './dao.module';

@Module({
    imports: [DaoModule, HttpModule],
    providers: [TestService, ShopService],
    exports: [TestService, ShopService],
})

export class ServiceModule { }

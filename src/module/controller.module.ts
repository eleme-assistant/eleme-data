import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ServiceModule } from './service.module';
import { ShopController, TestController } from '../controller';

@Module({
    imports: [ServiceModule],
    controllers: [TestController, ShopController],
})
export class ControllerModule { }

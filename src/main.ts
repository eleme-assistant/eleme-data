import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { } from './middleware/index';
import { RabbitMqMicro } from './micro/rabbitmq.micro';
import * as util from 'util';
import { Moment } from './common';

// 原生方法注入
const console_log = console.log;
console.log = function log(...objs: any[]): void {
    for (const obj of objs) {
        console_log(`[${Moment().toString()}] - `, obj);
    }
};
console.debug = function dump(...objs: any[]): void {
    for (const obj of objs) {
        console.log(util.inspect(obj, true, 8, true));
    }
};

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.connectMicroservice({
        strategy: new RabbitMqMicro(),
    });

    // 设置全局前缀
    // app.setGlobalPrefix('v1');

    /**
     * 加载全局中间件
     */

    await app.startAllMicroservices();
    await app.listen(3000);
}
bootstrap();
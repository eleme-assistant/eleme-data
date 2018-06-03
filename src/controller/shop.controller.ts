import { Get, Post, Controller, Body, UseGuards, UsePipes } from '@nestjs/common';
import { CreateShopDto } from '../dto/index';
import { PipeValidation } from '../pipe/index';
import { BaseController } from './base.controller';
import { ShopService } from '../service';
import { RabbitMqMicro } from '../micro/rabbitmq.micro';
import { MessagePattern } from '@nestjs/microservices';

@Controller('shops')
export class ShopController extends BaseController {

    private readonly rabbitMqMicro: RabbitMqMicro;

    constructor(
        private readonly shopService: ShopService,
    ) {
        super();
        this.rabbitMqMicro = new RabbitMqMicro();
    }

    @Post()
    public async store(@Body(new PipeValidation()) body: CreateShopDto) {
        return await this.shopService.createMany(body);

        // const coordinates = this.shopService.getCoordinatesByPoint(body.latitude, body.longitude, body.deep);
        // coordinates.subscribe((coordinate) => {
        //     this.rabbitMqMicro.push({
        //         latitude: coordinate.latitude,
        //         longitude: coordinate.longitude,
        //         deep: body.deep,
        //     });
        // });
    }

    @UsePipes(new PipeValidation())
    @MessagePattern('create')
    public async microCreateMany(dto: CreateShopDto) {
        return await this.shopService.createMany(dto);
    }

}

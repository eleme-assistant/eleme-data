import { } from '../const/index';
import { IsString, IsInt, IsIn, IsNumber } from 'class-validator';

export class CreateShopDto {

    @IsNumber()
    readonly latitude: number;

    @IsNumber()
    readonly longitude: number;

}
import { } from '../const/index';
import { IsString, IsInt, IsIn, IsNumber, Max, Min } from 'class-validator';
import { isNumber } from 'util';

export class CreateShopDto {

    @IsNumber()
    readonly latitude: number;

    @IsNumber()
    readonly longitude: number;

    @IsNumber() @Max(10) @Min(1)
    readonly deep?: number;

}
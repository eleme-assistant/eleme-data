import { Document } from 'mongoose';
import { IEleme } from './eleme.interface';
import { IType } from './type.interface';

export namespace IAttribute {

    interface Base extends Document {

    }

    export interface ITest extends Base {
        name: string;
    }

    export interface IMenu extends Base {
        menuName: string;
        menuId: number;
        shopId: IType.ID;
        day: string;
        data: IEleme.Menu;
    }

    export interface MShop extends IShop, Document {

    }

    export interface IShop {
        elemeShopName: string;
        elemeShopId: number;
        day: string;
        data: IEleme.Shop;
    }

    export interface MFood extends IFood, Document {

    }

    export interface IFood {
        elemeShopName: string;
        elemeShopId: number;
        elemeFoodId: number;
        shopId: string;
        name: string;
        day: string;
        data: IEleme.Food;
    }

}
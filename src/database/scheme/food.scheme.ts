import { ConstEntity } from '../../const/index';
import { BaseScheme } from './base.scheme';
import * as mongoose from 'mongoose';
import { _ } from '../../common';
const Types = mongoose.Schema.Types;

export const FoodScheme = new mongoose.Schema(_.assign({
    elemeShopName: { required: true, type: String },
    elemeShopId: { required: true, type: Number },
    shopId: { required: true, type: String },
    elemeFoodId: { required: true, type: Number },
    name: { required: true, type: String },
    day: { required: true, type: String },
    data: { type: Types.Mixed },
}, BaseScheme), { collection: _.snakeCase('food'), timestamps: true });
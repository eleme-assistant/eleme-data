import { ConstEntity } from '../../const/index';
import { BaseScheme } from './base.scheme';
import * as mongoose from 'mongoose';
import { _ } from '../../common';
const Types = mongoose.Schema.Types;

export const ShopScheme = new mongoose.Schema(_.assign({
    elemeShopName: { required: true, type: String },
    elemeShopId: { required: true, type: Number },
    day: { required: true, type: String },
    data: { type: Types.Mixed },
}, BaseScheme), { collection: _.snakeCase('shop'), timestamps: true });
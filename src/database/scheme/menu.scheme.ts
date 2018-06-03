import { ConstEntity } from '../../const/index';
import { BaseScheme } from './base.scheme';
import * as mongoose from 'mongoose';
import { _ } from '../../common';
const Types = mongoose.Schema.Types;

export const MenuScheme = new mongoose.Schema(_.assign({
    menuName: { required: true, type: String },
    menuId: { required: true, type: Number },
    shopId: { required: true, type: String },
    day: { required: true, type: String },
    data: { type: Types.Mixed },
}, BaseScheme), { collection: _.snakeCase('menu'), timestamps: true });
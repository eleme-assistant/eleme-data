import { Injectable } from '@nestjs/common';
import { BaseDao } from './base.dao';
import { InjectModel } from '@nestjs/mongoose';
import { IType, IAttribute } from 'interface';
import { Model } from 'mongoose';

@Injectable()
export class ShopDao extends BaseDao {

    constructor(
        @InjectModel('shop') private readonly shopModel: Model<IAttribute.MShop>,
    ) { super(); }

    public async createOne(data: IAttribute.IShop) {
        return await this.shopModel.create(data);
    }

    public async createOrUpdateOne(where: Partial<IAttribute.IShop>, create: IAttribute.IShop, update: Partial<IAttribute.IShop>) {
        const model = await this.shopModel.findOneAndUpdate(where, update).exec();
        if (!model) return this.createOne(create);
        return model;
    }

    public async findAll() {
        return await this.shopModel.find().exec();
    }

    public async findOne(where: Partial<IAttribute.IShop>) {
        return await this.shopModel.findOne({ where }).exec();
    }

    public async count(where: Partial<IAttribute.IShop>) {
        return await this.shopModel.count({ where }).exec();
    }

    public async findMany(where: Partial<IAttribute.IShop>) {
        return await this.shopModel.find({ where }).exec();
    }

}
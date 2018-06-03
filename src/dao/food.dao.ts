import { Injectable } from '@nestjs/common';
import { BaseDao } from './base.dao';
import { InjectModel } from '@nestjs/mongoose';
import { IType, IAttribute } from 'interface';
import { Model } from 'mongoose';

@Injectable()
export class FoodDao extends BaseDao {

    constructor(
        @InjectModel('food') private readonly foodModel: Model<IAttribute.MFood>,
    ) { super(); }

    public async createOne(data: IAttribute.IFood) {
        return await this.foodModel.create(data);
    }

    public async createOrUpdateOne(where: Partial<IAttribute.IFood>, create: IAttribute.IFood, update: Partial<IAttribute.IFood>) {
        const model = await this.foodModel.findOneAndUpdate(where, update).exec();
        if (!model) return this.createOne(create);
        return model;
    }

    public async findAll() {
        return await this.foodModel.find().exec();
    }

    public async findOne(where: Partial<IAttribute.IFood>) {
        return await this.foodModel.findOne({ where }).exec();
    }

    public async count(where: Partial<IAttribute.IFood>) {
        return await this.foodModel.count({ where }).exec();
    }

    public async findMany(where: Partial<IAttribute.IFood>) {
        return await this.foodModel.find({ where }).exec();
    }

}
import { Injectable } from '@nestjs/common';
import { BaseDao } from './base.dao';
import { InjectModel } from '@nestjs/mongoose';
import { IType, IAttribute } from 'interface';
import { Model } from 'mongoose';

@Injectable()
export class MenuDao extends BaseDao {

    constructor(
        @InjectModel('menu') private readonly menuModel: Model<IAttribute.IMenu>,
    ) { super(); }

    public async createOne(data: Partial<IAttribute.IMenu>) {
        return await this.menuModel.create(data);
    }

    public async findAll() {
        return await this.menuModel.find();
    }

    public async findOne(where: Partial<IAttribute.IMenu>) {
        return await this.menuModel.findOne({ where });
    }

    public async findMany(where: Partial<IAttribute.IMenu>) {
        return await this.menuModel.find({ where });
    }

}
import { FindOptions, Model, ModelCtor } from 'sequelize';

class Repository<T> {
  model: ModelCtor<Model<any, any>>;
  constructor(model: ModelCtor<Model<any, any>>) {
    this.model = model;
  }

  async findAll(filter: FindOptions<T> = {}) {
    const data = await this.model.findAll(filter);
    return data;
  }
}

export default Repository;

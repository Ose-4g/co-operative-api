import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize';

interface BallAttributes {
  id: number;
  radius: number;
  brand: string;
  sport: string;
}

interface BallCreationAttributes extends Optional<BallAttributes, 'id'> {}

interface BallInstance extends Model<BallAttributes, BallCreationAttributes>, BallAttributes {}

const BallModel = sequelize.define<BallInstance>('balls', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  radius: {
    type: DataTypes.STRING,
  },
  brand: {
    type: DataTypes.STRING,
  },
  sport: {
    type: DataTypes.STRING,
  },
});

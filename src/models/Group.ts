import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize';
import constants from '../utils/constants';

const { PUBLIC, PRIVATE } = constants.groupVisibilty;

interface GroupAttributes {
  id: number;
  name: string;
  description: string;
  visibility: string;
  maxCapacity: number;
  weeklyContribution: number;
}

interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

export interface GroupInstance extends Model<GroupAttributes, GroupCreationAttributes>, GroupAttributes {}

const GroupModel = sequelize.define<GroupInstance>('balls', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(30),
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(200),
  },
  visibility: {
    type: DataTypes.ENUM(PRIVATE, PUBLIC),
    defaultValue: PUBLIC,
    allowNull: false,
  },
  maxCapacity: {
    type: DataTypes.INTEGER,
    defaultValue: 20,
    allowNull: false,
  },
  weeklyContribution: {
    type: DataTypes.INTEGER,
    defaultValue: 1000,
    allowNull: false,
  },
});

export default GroupModel;

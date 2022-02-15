import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize';
import constants from '../utils/constants';

interface UserAttributes {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

const UserModel = sequelize.define<UserInstance>('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

export default UserModel;

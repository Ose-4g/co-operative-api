import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize';
import constants from '../utils/constants';

interface MemberAttributes {
  id: number;
  userId: number;
  groupId: number;
  amountContributed: number;
}

interface MemberCreationAttributes extends Optional<MemberAttributes, 'id'> {}

export interface MemberInstance extends Model<MemberAttributes, MemberCreationAttributes>, MemberAttributes {}

const MemberModel = sequelize.define<MemberInstance>('members', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amountContributed: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default MemberModel;

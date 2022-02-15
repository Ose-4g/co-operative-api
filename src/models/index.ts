import UserModel from './User';
import MemberModel from './Member';
import GroupModel from './Group';

//member and group association
GroupModel.hasMany(MemberModel, { foreignKey: 'groupId' });
MemberModel.belongsTo(GroupModel, { foreignKey: 'groupId' });

//member and user association
UserModel.hasMany(MemberModel, { foreignKey: 'userId' });
MemberModel.belongsTo(UserModel, { foreignKey: 'userId' });

export { GroupModel, UserModel, MemberModel };

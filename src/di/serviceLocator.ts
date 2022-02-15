import { GroupModel, MemberModel, UserModel } from '../models';
import GroupRepository from '../repository/GroupRepository';
import UserRepository from '../repository/UserRepository';
import AuthService from '../services/AuthService';
import GroupService from '../services/GroupService';
import MemberRepository from '../repository/MemberRepository';

const userRepository = new UserRepository(UserModel);
const groupRepository = new GroupRepository(GroupModel);
const memberRepository = new MemberRepository(MemberModel);

const authService = new AuthService(userRepository);
const groupService = new GroupService(groupRepository, memberRepository);

export { userRepository, authService, groupRepository, groupService };

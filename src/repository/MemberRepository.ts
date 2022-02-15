import { MemberInstance } from '../models/Member';
import Repository from './Repository';

class MemberRepository extends Repository<MemberInstance> {
  async create(data: MemberInstance) {
    let { userId, groupId, role, amountContributed } = data;

    const member = await this.model.create({
      userId,
      groupId,
      role,
      amountContributed,
    });
    return member;
  }
}

export default MemberRepository;

import { GroupInstance } from '../models/Group';
import Repository from './Repository';

class GroupRepository extends Repository<GroupInstance> {
  async create(data: GroupInstance) {
    let { name, description, maxCapacity, weeklyContribution, visibility } = data;

    const group = await this.model.create({
      name,
      description,
      maxCapacity,
      weeklyContribution,
      visibility,
    });
    return group;
  }
}

export default GroupRepository;

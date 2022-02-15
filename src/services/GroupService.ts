import { NextFunction, Request, Response } from 'express';
import { UserModel, GroupModel } from '../models';
import { UserInstance } from '../models/User';
import GroupRepository from '../repository/GroupRepository';
import successResponse from '../middleware/response';
import AppError from '../errors/AppError';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../utils/token';
import { FindOptions } from 'sequelize/types';
import { GroupInstance } from '../models/Group';
import { Op } from 'sequelize';
import MemberRepository from '../repository/MemberRepository';
import { MemberInstance } from '../models/Member';

class GroupService {
  groupRepository: GroupRepository;
  memberRepository: MemberRepository;

  constructor(groupRepository: GroupRepository, memberRepository: MemberRepository) {
    this.groupRepository = groupRepository;
    this.memberRepository = memberRepository;
  }

  getAllPublicGroups() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { page, limit, search } = req.query;

      let _page = parseInt(page as string) || 1;
      _page = Math.max(1, _page);

      let _limit = parseInt(limit as string) || 10;
      _limit = Math.max(_limit, 1);

      const filter: FindOptions<GroupInstance> = {
        limit: _limit,
        offset: (_page - 1) * _limit,
      };

      if (search) {
        filter.where = {
          visibility: 'public',
          name: {
            [Op.like]: `%${String(search).toLowerCase()}%`,
          },
        };
      }

      try {
        const list = await this.groupRepository.findAll(filter);
        return successResponse(res, 200, `successfully returned ${list.length} result`, list);
      } catch (error) {
        return next(error);
      }
    };
  }

  createGroup() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { name, description, maxCapacity, weeklyContribution, visibility } = req.body;

      const _maxCapacity = parseInt(maxCapacity);
      const _weeklyContribution = parseInt(weeklyContribution);
      try {
        const data = (await this.groupRepository.create({
          name: String(name).toLowerCase(),
          description,
          maxCapacity: _maxCapacity,
          weeklyContribution: _weeklyContribution,
          visibility,
        } as GroupInstance)) as GroupInstance;

        const member = await this.memberRepository.create({
          userId: req.user.id,
          groupId: data.id,
          role: 'admin',
          amountContributed: 0,
        } as MemberInstance);

        return successResponse(res, 201, `Group ${data.name} created successfully`, { group: data, member });
      } catch (error) {
        return next(error);
      }
    };
  }

  getAllMembers() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { groupId } = req.params;

      try {
        const data = await this.memberRepository.findAll({
          where: {
            groupId,
          },
        });
        if (data.length === 0) {
          return next(new AppError('group not found', 404));
        }

        return successResponse(res, 200, 'Members fetched successfully', data);
      } catch (error) {
        return next(error);
      }
    };
  }
}

export default GroupService;

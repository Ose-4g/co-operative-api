import { Router } from 'express';
import { groupService } from '../di/serviceLocator';
import { requireSignIn } from '../middleware/auth';

const router = Router();

router.post('/new', requireSignIn, groupService.createGroup());

router.get('/', requireSignIn, groupService.getAllPublicGroups());
router.post('/new', requireSignIn, groupService.createGroup());
router.get('/:groupId/members', requireSignIn, groupService.getAllMembers());
export default router;

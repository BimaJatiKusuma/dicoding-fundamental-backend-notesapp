import { Router } from 'express';
import { createUser, getUserById, getUsersByUsername } from '../controller/user-controller.js';
import validate from '../../../middlewares/validate.js';
import { userPayloadSchema } from '../../users/validator/schema.js'

const router = Router();

router.post('/', validate(userPayloadSchema), createUser);
router.get('/:id', getUserById);
router.get('/', getUsersByUsername)

export default router;
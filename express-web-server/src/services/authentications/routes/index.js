import { Router } from 'express';
import { login, refreshToken, logout } from '../controller/authentication-controller.js';
import validate from '../../../middlewares/validate.js';
import {
    PostAuthenticationPayloadScheme,
    PutAuthenticationPayloadSchema,
    DeleteAuthenticationPayloadSchema,
} from '../validator/schema.js';

const router = Router();

router.post('/', validate(PostAuthenticationPayloadScheme), login);
router.put('/', validate(PutAuthenticationPayloadSchema), refreshToken);
router.delete('/', validate(DeleteAuthenticationPayloadSchema), logout);

export default router;
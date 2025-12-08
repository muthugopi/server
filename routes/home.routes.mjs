import {Router} from 'express';
import { info } from '../controllers/home.controller.mjs';
import { isAdmin } from '../controllers/auth.controller.mjs';

const router = Router();

router.get('/', isAdmin, info);

export default router;
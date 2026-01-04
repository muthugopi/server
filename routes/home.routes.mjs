import {Router} from 'express';
import { info } from '../controllers/home.controller.mjs';

const router = Router();

router.get('/', info);

export default router;
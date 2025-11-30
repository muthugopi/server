import {Router} from 'express';
import { checkAuth } from '../controllers/auth.controller.mjs';

const router = Router();
router.get('/', checkAuth);
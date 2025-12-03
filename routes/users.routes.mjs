import express from 'express';
import {getAllUsers, createUser} from '../controllers/users.controller.mjs'
import { checkSchema } from 'express-validator';
import { createUserValidationSchema } from '../src/utils/validationSchemas.mjs';
import { isAdmin } from '../controllers/auth.controller.mjs';

const router = express.Router();

router.get('/', isAdmin, getAllUsers);
router.post('/', checkSchema(createUserValidationSchema) ,createUser);

export default router
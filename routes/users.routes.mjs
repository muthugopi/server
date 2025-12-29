import express from 'express';
import {getAllUsers, createUser, deleteUser} from '../controllers/users.controller.mjs'
import { checkSchema } from 'express-validator';
import { createUserValidationSchema } from '../src/utils/validationSchemas.mjs';
import { isAdmin } from '../controllers/auth.controller.mjs';

const router = express.Router();

router.get('/', isAdmin, getAllUsers);
router.post('/',isAdmin, checkSchema(createUserValidationSchema) ,createUser);
router.delete('/:id', isAdmin, deleteUser);

export default router
import express from 'express';
import {getAllUsers, createUser, deleteUser} from '../controllers/users.controller.mjs'
import { checkSchema } from 'express-validator';
import { createUserValidationSchema } from '../src/utils/validationSchemas.mjs';
import { authorize } from '../middlewares/role.middleware.mjs';
import { authenticate } from '../middlewares/auth.middleware.mjs';
const router = express.Router();

router.get('/', authenticate, authorize("admin"), getAllUsers);
router.post('/', checkSchema(createUserValidationSchema) ,createUser);
router.delete('/:id', deleteUser);

export default router
import express from 'express';
import {getAllUsers, createUser, deleteUser} from '../controllers/users.controller.mjs'
import { checkSchema } from 'express-validator';
import { createUserValidationSchema } from '../src/utils/validationSchemas.mjs';
const router = express.Router();

router.get('/', getAllUsers);
router.post('/', checkSchema(createUserValidationSchema) ,createUser);
router.delete('/:id', deleteUser);

export default router
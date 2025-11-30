import express from 'express';
import { register, login } from '../controllers/register.controller.mjs';
import { createRegisterValidationSchema } from '../src/utils/validationSchemas.mjs';
import { checkSchema } from 'express-validator';
import { checkAuth } from '../controllers/auth.controller.mjs';

const router = express.Router();

router.post('/', checkSchema(createRegisterValidationSchema) ,register);
router.get('/', checkAuth, login);

export default router;
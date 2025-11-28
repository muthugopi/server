import express from 'express';
import { register, login } from '../controllers/register.controller.mjs';
import { createRegisterValidationSchema } from '../src/utils/validationSchemas.mjs';
import { checkSchema } from 'express-validator';

const router = express.Router();

router.post('/', checkSchema(createRegisterValidationSchema) ,register);
router.get('/', login);

export default router;
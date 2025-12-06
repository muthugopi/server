import express from 'express';
import { register} from '../controllers/register.controller.mjs';
import { createRegisterValidationSchema } from '../src/utils/validationSchemas.mjs';
import { checkSchema } from 'express-validator';

const router = express.Router();

router.post('/', checkSchema(createRegisterValidationSchema) ,register);

export default router;
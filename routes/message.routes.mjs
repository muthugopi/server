import express from 'express';
import { getMessage, showMessages } from '../controllers/message.controllers.mjs';
import { createMessageValidationSchema } from '../src/utils/validationSchemas.mjs';
import { checkSchema } from 'express-validator';

const router = express.Router();

router.get('/', showMessages);
router.post('/', checkSchema(createMessageValidationSchema),getMessage);

export  default router;
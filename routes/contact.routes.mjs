import express from 'express';
import { getMessage, showMessages } from '../controllers/message.controllers.mjs';
import { createMessageValidationSchema } from '../src/utils/validationSchemas.mjs';
import { checkSchema } from 'express-validator';
import { isAdmin, isLogined } from '../controllers/auth.controller.mjs';

const router = express.Router();

router.get('/',isAdmin , showMessages);
router.post('/', isLogined,  checkSchema(createMessageValidationSchema),getMessage);

export  default router;
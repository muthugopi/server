import express from 'express';
import { getAllStudents, createStudent } from '../controllers/students.controllers.mjs';
import { createUserValidationSchema } from "../src/utils/validationSchemas.mjs";
import { checkSchema } from "express-validator";

const router = express.Router();

router.get('/', getAllStudents);   
router.post('/', checkSchema(createUserValidationSchema), createStudent);   

export default router;

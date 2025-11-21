import express, { Router } from 'express';
import { getAllStudents, createStudent, modifyStudent, deleteStudent } from '../controllers/students.controllers.mjs';
import { createStudentValidationSchema } from "../src/utils/validationSchemas.mjs";
import { checkSchema } from "express-validator";

const router = express.Router();

router.get('/', getAllStudents);   
router.post('/', checkSchema(createStudentValidationSchema), createStudent);   
router.patch('/', modifyStudent);
router.delete('/', deleteStudent);

export default router;

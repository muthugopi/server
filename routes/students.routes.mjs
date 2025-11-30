import express, { Router } from 'express';
import { getAllStudents, createStudent, modifyStudent, deleteStudent } from '../controllers/students.controllers.mjs';
import { createStudentValidationSchema } from "../src/utils/validationSchemas.mjs";
import { checkSchema } from "express-validator";
import { checkAuth } from '../controllers/auth.controller.mjs';

const router = express.Router();

router.get('/', checkAuth,getAllStudents);   
router.post('/', checkSchema(createStudentValidationSchema), createStudent);   
router.patch('/', checkAuth, modifyStudent);
router.delete('/', checkAuth, deleteStudent);

export default router;

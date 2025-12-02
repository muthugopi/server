import express, { Router } from 'express';
import { getAllStudents, createStudent, modifyStudent, deleteStudent } from '../controllers/students.controllers.mjs';
import { createStudentValidationSchema } from "../src/utils/validationSchemas.mjs";
import { checkSchema } from "express-validator";
import { isAdmin } from '../controllers/auth.controller.mjs';

const router = express.Router();

router.get('/', isAdmin,getAllStudents);   
router.post('/', checkSchema(createStudentValidationSchema), createStudent);   
router.patch('/', isAdmin, modifyStudent);
router.delete('/', isAdmin, deleteStudent);

export default router;

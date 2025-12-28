import express, { Router } from 'express';
import { getAllStudents, createStudent, modifyStudent, deleteStudent, updateStuent} from '../controllers/students.controllers.mjs';
import { createStudentValidationSchema } from "../src/utils/validationSchemas.mjs";
import { check, checkSchema } from "express-validator";
import { isAdmin } from '../controllers/auth.controller.mjs';

const router = express.Router();

router.get('/', isAdmin, getAllStudents);   
router.post('/', checkSchema(createStudentValidationSchema), createStudent);
router.put('/:id', checkSchema(createStudentValidationSchema), updateStuent)   ;
router.patch('/:id', modifyStudent);
router.delete('/:id', isAdmin, deleteStudent);
// router.post('/m', createStudentSequelize);

export default router;

import express from 'express';
import { getAllStudents, createStudent, modifyStudent, deleteStudent, updateStuent} from '../controllers/students.controllers.mjs';
import { createStudentValidationSchema } from "../src/utils/validationSchemas.mjs";
import { checkSchema } from "express-validator";

const router = express.Router();

router.get('/', getAllStudents);   
router.post('/', checkSchema(createStudentValidationSchema), createStudent);
router.put('/:id', checkSchema(createStudentValidationSchema), updateStuent)   ;
router.patch('/:id', modifyStudent);
router.delete('/:id', deleteStudent);
// router.post('/m', createStudentSequelize);

export default router;

import { notFound, fail, serverError, ok } from "../src/utils/errorHandling.mjs";
import { validationResult, matchedData } from "express-validator";
import Student from "../models/student.model.mjs";


export const getAllStudents = async (req, res) => {
    try {
        //req.session.visited = true;
        const students = await Student.findAll();

        //for no data
        if (!students || students.length == 0) {
            return notFound(res);
        }
        //success response !
        return ok(res,students);
    }

    catch (err) {
        console.log(`Error : ${err} ${res.headersSent}`);
    }
}


export const createStudent = async (req, res) => {
    try {
        const error = validationResult(req);
        if(!error.isEmpty()) 
            return fail(res, "check the schema");

        const data = matchedData(req)

        const student = await Student.create({
            name : data.name,
            age : data.age,
            marks :data.marks,
            role : data.role,
        });
        res.session.role = "student"
        res.status(201).json({
            message: "Student created successfully",
            data: student,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating student",
            error: error.message,
        });
    }
};

export const updateStuent = async (req, res) => {
    const { id } = req.params;
    const { name, age, marks, role } = req.body;

    const student = await Student.findByPk(id);

    if (!student)
        return notFound(res);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return fail(res, errors.array());
    }

    const data = matchedData(req);
    student.name = data.name;
    student.age = data.age;
    student.marks = data.marks;
    student.role = data.role;
    await student.save();

    return ok(res,{data});
}

export const modifyStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { marks } = req.body;
        const student = await Student.findByPk(id);

        if (marks === undefined || isNaN(Number(marks))) {
            return fail(res, "Marks must be a number");
        }

        if (!student) {
            return notFound(res, { Msg: "Student Not FOund" });
        }
        student.marks = marks;
        await student.save();
        return ok(res, {modified : true})
    } catch (err) {
        serverError(res, { msg: "check console" });
        console.log(`Error : ${err.message}`);
    }
}



export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findByPk(id);
        if (!student) {
            return notFound(res, { deleted: false });
        }
        await student.destroy();

        return ok(res, {deleted : true});
    }
    catch (err) {
        serverError(res, { msg: "check console" });
        console.log(`Error : ${err.message}`);
    }
}
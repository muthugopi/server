import Student from '../models/student.model.mjs';
import User from '../models/user.model.mjs';
import db from '../src/utils/db.mjs';
import { serverError, customError, notFound } from '../src/utils/errorHandling.mjs';
import { validationResult, matchedData } from 'express-validator';

export const getAllUsers = async (req, res) => {
  try {
const users = await User.findAll({attributes: { exclude: ["password"] }});

    if (users.length === 0) {
      return res.status(200).json({
        message: "No users found"
      });
    }


    return res.status(200).send({data : users});

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};


export const createUser = async (req, res) => {
    //const {name, password, phone} = req.body;
    //if ( !(name && password && phone) ) {
    //    customeError(res, 400, "Bad Request !");
    //}
    try {
        const result = validationResult(req);
    if(!result.isEmpty()) {
        return customError(res, 400, "Bad Request");
    }
    const {name, phone} = matchedData(req);

    const newUser = await User.create({
        name : name,
        phone : phone
    })

    return res.status(201).send({msg : "new User was created by the admin"})
    }
    catch(err) {
        console.log("error inside the  createUser !");
        return serverError(res);
    }
}

export const  deleteUser = async (req, res) => {
    const {id} = req.params;

    const user = await User.findByPk(id);

    if(!user || user.length === 0) {
        return notFound(res);
    }

    await user.destroy();

    return res.status(200).send({msg : "User Deleted Succesfully !"});
}
import User from '../models/user.model.mjs';
import { serverError, notFound, fail} from '../src/utils/responseHandling.mjs';
import { validationResult, matchedData } from 'express-validator';

export const getAllUsers = async (req, res) => {
  try {
const users = await User.findAll({attributes: { exclude: ["password"] }});

    if (users.length === 0) {
      return notFound(res);
    }


    return res.status(200).json(users);

  } catch (error) {
    console.error(error);
    return serverError(res);
  }
};


export const createUser = async (req, res) => {
    //}
    try {
        const result = validationResult(req);
    if(!result.isEmpty()) {
        return fail(res,"Bad Request");
    }
    const {name, phone} = matchedData(req);

    const newUser = await User.create({
        name : name,
        phone : phone
    })
    req.session.role = "user"
    return res.status(201).send("Created !");
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

    return res.status(200).send("User Deleted Successfully !");
}
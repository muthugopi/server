import db from "../src/utils/db.mjs";
import { customeError, serverError, notFound } from "../src/utils/errorHandling.mjs";
import { validationResult, matchedData } from "express-validator";

export const checkAuth = (req, res) => {
    const {name, password} = req.body;
``
}
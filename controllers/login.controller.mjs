// controllers/login.controller.mjs
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const user = req.user;

  const payload = {
    id: user._id,
    name: user.name,
    role: user.role
  };

  const token = jwt.sign(
    payload,
    process.env.SECRET,
    { expiresIn: "1d" }
  );

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user : {
        name : user.name,
        phone : user.phone
    }
  });
};

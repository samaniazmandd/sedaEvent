import jwt from "jsonwebtoken";

import {
  controlPassword,
  findUserByEmail,
  createUser,
} from "../db/User.js";

async function signUpController(req, res) {
  try {
    const { email } = req.body;
    const exist = await findUserByEmail(email);
    if (exist) {
      return res.status(409).json({
        error: "we already have you, please just log in",
      });
    }

    const userNew = await createUser(req.body);
    return res.status(201).json({ user: userNew });
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const userEmail = await findUserByEmail(email);
    if (!userEmail) {
      return res.status(401).json({
        error: "Wrong email or password",
      });
    }

    const userPassword = await controlPassword(password, userEmail.password);
    if (!userPassword) {
      return res.status(401).json({
        error: "Wrong email or password",
      });
    }

    const token = jwt.sign(
      {
        subject: userEmail.id,
        email: userEmail.email,
        isAdmin: userEmail.isAdmin,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3h" }
    );

    return res.status(200).json({ token });
  } catch (e) {
    return res.status(e.status || 500).json({
      error: e.message,
    });
  }
}


export {
  signUpController,
  loginController,
};

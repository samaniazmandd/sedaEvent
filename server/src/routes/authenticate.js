import express from "express";
import {
  signUpController,
  loginController,
} from "../controllers/authentication.controller.js";
import { userCheck } from "../middleware/validators.js";


const router = express.Router();

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     summary: Sign up or create user
 *     description: makes a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, mobile_phone, city]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 example: "user12345"
 *               mobile_phone:
 *                 type: string
 *                 example: "0612345678"
 *               city:
 *                 type: string
 *                 example: "Deventer"
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 7
 *                     email:
 *                       type: string
 *                       example: user@gmail.com
 *                     mobile_phone:
 *                       type: string
 *                       example: "0612345678"
 *                     city:
 *                       type: string
 *                       example: "Deventer"
 *                     isAdmin:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: All fields are required or not the correct email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input/ empty input"
 *       409:
 *         description: Email does already exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email already in use"
 */

router.post("/signup", userCheck, signUpController);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Log in as a user or admin
 *     description: it controls the email and password and gives json web token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 example: "user12345"
 *     responses:
 *       200:
 *         description: logged in with token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: G9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn
 *       401:
 *         description: Invalid login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "email or password wrong"
 *       409:
 *         description: Email does already exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email already in use"
 */
router.post("/login", loginController);
export default router;

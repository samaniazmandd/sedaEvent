import express from "express";
import {
  deleteUserByIdController,
  getAllUsersController,
  getUserByEmailController
} from "../controllers/user.controller.js";
import { authenticateToken, isAdmin } from "../middleware/authenticate.js";

const router = express.Router();
/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     summary: Delete a use by id
 *     description: Allow only admins to delete a user by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the user to delete
 *         schema:
 *           type: integer
 *           example: 7
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 7
 *       401:
 *         description: Invalid login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User is not logged in"
 *       403:
 *         description: forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You are not the admin/ jwt expired log in again"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Something went wrong while deleting user"
 */

router.delete("/:id", authenticateToken, isAdmin, deleteUserByIdController);

/**
 * @openapi
 * /user/users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of all registred users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 3
 *                       email:
 *                         type: string
 *                         example: "user@gmail.com"
 *                       mobile_phone:
 *                         type: string
 *                         example: "0612345678"
 *                       city:
 *                         type: string
 *                         example: "Deventer"
 *                       isAdmin:
 *                         type: boolean
 *                         example: false
 *       401:
 *         description: Invalid login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User is not logged in"
 *       403:
 *         description: forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You are not the admin/ jwt expired log in again"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Something went wrong while deleting user"
 */

router.get("/users", authenticateToken, isAdmin, getAllUsersController);
/**
 * @openapi
 * /user/{email}:
 *   get:
 *     summary: Get user by email ( email works as username)
 *     description: Returns a user object based on email given ,excluding the password
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: The email of the user
 *         schema:
 *           type: string
 *           example: "user@gmail.com"
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 3
 *                       email:
 *                         type: string
 *                         example: "user@gmail.com"
 *                       mobile_phone:
 *                         type: string
 *                         example: "0612345678"
 *                       city:
 *                         type: string
 *                         example: "Deventer"
 *                       isAdmin:
 *                         type: boolean
 *                         example: false
 *       401:
 *         description: Invalid login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User is not logged in"
 *       403:
 *         description: forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You are not the admin/ jwt expired log in again"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Something went wrong while deleting user"
 */


router.get("/:email",authenticateToken,isAdmin,getUserByEmailController)

export default router;

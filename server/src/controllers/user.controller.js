import { deleteUserById, getAllUsers, findUserByEmailWithoutPassword } from "../db/User.js";

async function deleteUserByIdController(req, res) {
  try {
    const { id } = req.params;

    const result = await deleteUserById(id);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
}

async function getAllUsersController(req, res) {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
}

async function getUserByEmailController(req, res) {
  try {
    const { email } = req.params;

    const user = await findUserByEmailWithoutPassword(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
}

export { deleteUserByIdController, getAllUsersController,getUserByEmailController };

import { sequelize } from "./sequelize.js";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

//got hint from this https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "user",
  }
);

async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await User.create({
    email: data.email,
    password: hashedPassword,
    mobile_phone: data.mobile_phone,
    city: data.city,
    isAdmin: data.isAdmin ?? false,
  });

  //https://stackoverflow.com/questions/27972271/sequelize-dont-return-password
  const userToReturn = await User.findByPk(user.id, {
    attributes: {
      exclude: ["password"],
    },
  });
  return userToReturn;
}

async function deleteUserById(id) {
  const user = await User.destroy({
    where: { id },
  });
  if (!user) {
    const err = new Error("user not found");
    err.status = 404;
    throw err;
  }
  return { id, message: "User deleted successfully" };
}

async function getAllUsers() {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });

  return users;
}

function findUserByEmail(email) {
  return User.findOne({
    where: { email },
  });
}

function findUserByEmailWithoutPassword(email) {
  return User.findOne({
    where: { email },
    attributes: { exclude: ["password"] },
  });
}

//hints from https://www.npmjs.com/package/bcrypt
async function controlPassword(userInputPassword, hashPassword) {
  return await bcrypt.compare(userInputPassword, hashPassword);
}

export {
  createUser,
  findUserByEmail,
  deleteUserById,
  getAllUsers,
  controlPassword,
  findUserByEmailWithoutPassword,
  User,
};

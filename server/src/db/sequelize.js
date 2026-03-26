import { config } from "dotenv";
import { Sequelize } from "sequelize";

// I hadd to add this so I dont get undefined 
config({ path: process.env.NODE_ENV === "test" ? "./.env.test" : "./.env.dev" });

// I made this because I was struggling with how I could separate my database and test db from eachother
// so I made env.test with its own test database which is only for my test 
const isTest = process.env.NODE_ENV === "test";

// Check https://sequelize.org/ for the Getting Started
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
   storage: process.env.DB_STORAGE,
});

// I do this because otherwise every time I run my tests, hundreds of dummy users and events and reseravtion ... 
// will be added to my test dataabse 
if (isTest) {
  await sequelize.sync({ force: true });
}

export {sequelize}
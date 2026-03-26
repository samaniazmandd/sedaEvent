import { createUser, findUserByEmail } from "./User.js";

async function initializeAdmin(email, password) {
  if (!email || !password) {
    return;
  }

  const exist = await findUserByEmail(email);
  if (exist) {
    return;
  }

  await createUser({
    email,
    password,
    mobile_phone: "0000000000",
    city: "Admin",
    isAdmin: true,
  });
}

async function initializeUser(email, password) {
  if (!email || !password) {
    return;
  }

  const exists = await findUserByEmail(email);

  if (exists) {
    return;
  }

  await createUser({
    email,
    password,
    mobile_phone: "0612345678",
    city: "Deventer",
    isAdmin: false,
  });
}

export { initializeAdmin, initializeUser };

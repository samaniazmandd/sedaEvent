import { getToken } from "./auth.api.js";

async function getAllUsers() {
  try {
    const token = getToken();
    const res = await fetch("http://localhost:3000/user/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || data.message);
    }

    // if (Array.isArray(data)) {
    //   return data;
    // } else if (Array.isArray(data?.users)) {
    //   return data.users;
    // } else {
    //   return [];
    // }
    return data;
  } catch (err) {
    throw err;
  }
}

async function getUserByEmail(email) {
  try {
    const token = getToken();
    const res = await fetch(`http://localhost:3000/user/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
}

async function deleteUserById(id) {
  try {
    const token = getToken();
    const res = await fetch(`http://localhost:3000/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 204) {
      return "User deleted succesfully";
    }
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
}

function getUserId() {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const sub = payload?.subject ?? payload?.sub;
    return Number(sub);
  } catch {
    return null;
  }
}

export { getAllUsers, getUserByEmail, deleteUserById, getUserId };

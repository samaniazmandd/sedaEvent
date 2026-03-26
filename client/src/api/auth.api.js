async function login(email, password) {
  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || data.message);
    }

    const token = data.token;
    localStorage.setItem("token", token);
    return token;
  } catch (err) {
    throw err;
  }
}

function getToken() {
  return localStorage.getItem("token");
}

function isLoggedIn() {
  return !!getToken();
}

function isAdmin() {
  const token = getToken();
  if (!token) {
    return false;
  }
  // https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-without-using-a-library
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.isAdmin === true;
  } catch {
    return false;
  }
}

function logout() {
  localStorage.removeItem("token");
}

async function signUp(email, password, mobile_phone, city) {
  try {
    const res = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, mobile_phone, city }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || data.message);
    }

    return data.user;
  } catch {
    return false;
  }
}

export { login, getToken, isLoggedIn, isAdmin, logout, signUp };

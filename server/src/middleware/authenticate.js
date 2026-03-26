import jwt from "jsonwebtoken";

//got hints from
//https://www.youtube.com/watch?v=mbsmsi7l3r4
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "User is not logged in",
    });
  }
  try {
    const accessToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = accessToken;
    next();
  } catch (err) {
     if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "jwt expired, log in again" });
    }
  }
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin !== true) {
    return res.status(403).json({
      error: "Forbidden, you are not the admin",
    });
  }
  next();
}

export { authenticateToken, isAdmin };

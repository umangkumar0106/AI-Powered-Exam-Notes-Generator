import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token || token.trim() === "") {
      return res.status(401).json({ message: "Token is not provided" });
    }
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res
        .status(401)
        .json({ message: "Invalid authentication token" });
    }
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

export default isAuth;

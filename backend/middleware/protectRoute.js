import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized- no Token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    if (!decoded) {
      return res.status(400).json({ error: "Unauthorized - Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password"); //return user without password
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    req.status(500).json({ error: "Internal Server Error" });
  }
};
export default protectRoute;

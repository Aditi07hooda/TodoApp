import jwt from "jsonwebtoken";
import { userModel } from "../models/schemaModel.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).send("Authentication failed. no token found");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded._id);
    next();
  } catch (error) {
    res.status(401).send("Authentication failed");
  }
};

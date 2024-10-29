import { User } from "./user.model.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username });
    if (!admin) {
      res.status(404).send({ message: "Admin Not Found!" });
    }
    if (password !== admin.password) {
      res.status(401).send({ message: "Invalid password" });
    }
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).send({
      message: "Authentication Successfull",
      token,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.log("failed to login as admin", error);
    res.status(401).send({ message: "failed to login as admin" });
  }
};

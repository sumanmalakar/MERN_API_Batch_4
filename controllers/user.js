import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// user register
export const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user)
      return res.json({ message: "User Already Register", success: false });

    let hasPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, phone, password: hasPassword });

    res.json({ message: "User Register Successfully", user, success: true });
  } catch (error) {
    res.json({ message: "Internal Server Error ", success: flase });
  }
};

// user login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user)
      return res.json({ message: "User not exist...!", success: false });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.json({ message: "Invalid Credentials", success: false });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_Screte);

    res.json({ message: `Welcome ${user.name}`, token, success: true });
  } catch (error) {
    res.json({ message: "Internal Server Error ", success: flase });
  }
};

// user Profile
export const profile = async (req, res) => {
  const token = req.header("auth");

  if (!token) return res.json({ message: "Login First", success: false });

  let decoded = jwt.verify(token, process.env.JWT_Screte);

  const id = decoded.userId;

  const user = await User.findById(id);

  const { name, email } = user;

  res.json({ message: `welcome ${name}`, name, email, success: true });
};

// forgot password

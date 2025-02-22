import User from "@/models/User";
import { verifypassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Error connecting to DB!" });
  }

  const { email, password } = req.body;
  const secretKey = process.env.SECRET_KEY;
  const expireTokenTime = 24 * 60 * 60;

  if (!email || !password) {
    return res.status(429).json({ status: "failed", message: "Invalli Data!" });
  }

  const userExisiting = await User.findOne({ email });

  if (!userExisiting) {
    return res
      .status(404)
      .json({ status: "failed", message: "User dosn't exist!" });
  }

  const verifyPass = await verifypassword(password, userExisiting.password);

  if (!verifyPass) {
    return res
      .status(422)
      .json({ status: "failed", message: "Invalid username or password!" });
  }

  const token = sign({ email }, secretKey, { expiresIn: expireTokenTime });

  const serialized = serialize("token", token, {
    maxAge: expireTokenTime,
    httpOnly: true,
    path: "/",
  });

  res
    .setHeader("Set-Cookie", serialized)
    .status(200)
    .json({ status: "success", message: "login successfully." });
}

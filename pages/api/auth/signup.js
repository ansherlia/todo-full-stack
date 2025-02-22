import User from "@/models/User";
import { hashedPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Error connecting to database!" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "Invalid Data!" });
  }

  const userExisiting = await User.findOne({ email: email });

  if (userExisiting) {
    return res
      .status(403)
      .json({ status: "failed", message: "User already exist!" });
  }

  const hashed = await hashedPassword(password);

  const user = await User.create({ email, password: hashed });

  res.status(201).json({ status: "success", message: "Sign in successfully." });
}

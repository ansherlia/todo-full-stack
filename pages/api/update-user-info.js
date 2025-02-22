import User from "@/models/User";
import { verifypassword, verifyToken } from "@/utils/auth";
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
  const { name, lastName, password } = req.body;
  console.log(req.body);
  const { token } = req.cookies;
  const secretKey = process.env.SECRET_KEY;

  if (!name || !lastName || !password) {
    return res.status(422).json({ status: "failed", message: "Invalid data!" });
  }

  const verifyToke = verifyToken(token, secretKey);
  if (!verifyToke) {
    return res.status(401).json({ status: "failed", message: "Unuthorized!" });
  }

  const user = await User.findOne({ email: verifyToke.email });

  const verifyPass = await verifypassword(password, user.password);

  if (!verifyPass) {
    return res
      .status(429)
      .json({ status: "failed", message: "Password is incorrect!" });
  }

  user.name = name;
  user.lastName = lastName;
  user.save();
  res.status(200).json({
    status: "success",
    message: "user updated successfully.",
    data: user,
  });
}

import User from "@/models/User";
import { verifyToken } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed,", message: "Error connecting  to DB!" });
  }

  const { id, title, description, status } = req.body;
  console.log({ id, title, description, status });
  if (!id || !title || !description || !status) {
    return res.status(422).json({ status: "failed", message: "Invalid Data!" });
  }

  const { token } = req.cookies;
  const secretKey = process.env.SECRET_KEY;
  const verify = verifyToken(token, secretKey);
  if (!verify) {
    return res.status(401).json({ status: "failed", message: "Unuthorized!" });
  }

  const user = await User.findOne({ email: verify.email });

  const todo = user.todos.find((todo) => todo._id.toString() === id);

  if (!todo) {
    return res
      .status(404)
      .json({ status: "failed", message: "Todo not exist!" });
  }

  todo.title = title;
  todo.description = description;
  todo.status = status;
  user.save();
  res
    .status(200)
    .json({ status: "success", message: "Todo updated successfully." });
}

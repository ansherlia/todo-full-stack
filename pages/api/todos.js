import User from "@/models/User";
import { verifyToken } from "@/utils/auth";
import connectDB from "@/utils/connectDB"; // Ensure connectDB is imported
import { sortTodos } from "@/utils/sortTodos";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Error connecting to DB!" });
  }

  const { token } = req.cookies;
  const { title, status, description } = req.body;
  const secretKey = process.env.SECRET_KEY;

  const verify = verifyToken(token, secretKey);

  if (!verify) {
    return res.status(401).json({ status: "failed", message: "Unauthorized!" });
  }

  const user = await User.findOne({ email: verify.email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User not found!" });
  }
  if (req.method === "POST") {
    if (!title || !description || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data!" });
    }
    user.todos.push({ title, status, description });
    await user.save();
    res
      .status(201)
      .json({ status: "success", message: "Todo created successfully." });
  } else if (req.method === "GET") {
    const todosData = sortTodos(user.todos);

    res.status(200).json({ status: "success", data: todosData });
  } else if (req.method === "PATCH") {
    const { id, status } = req.body;
    console.log({ id, status });
    if (!id || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid Data!" });
    }
    const updateTodo = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status } }
    );
  }
  user.save();
  res
    .status(200)
    .json({ status: "success", message: "Todo updated successfully." });
}

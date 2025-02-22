import TodoDetailsPage from "@/components/templates/TodoDetailsPage";
import User from "@/models/User";
import { verifyToken } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { useRouter } from "next/navigation";

function TodoDetails({ data }) {
  return <TodoDetailsPage data={data} />;
}

export default TodoDetails;

export async function getServerSideProps({ query, req }) {
  const { todoId } = query;
  const { token } = req.cookies;
  const secretKey = process.env.SECRET_KEY;
  await connectDB(); // Ensure database connection is established

  const verify = verifyToken(token, secretKey);
  if (!verify)
    return {
      redirect: { destination: "/auth/login", permanent: false },
    };

  const user = await User.findOne({ email: verify.email });
  if (!user) {
    return;
  }
  const todo = user.todos.find((todo) => todo._id.toString() === todoId);
  console.log(todo);
  return {
    props: {
      data: JSON.parse(JSON.stringify(todo)),
    },
  };
}

import AddTodoPage from "@/components/templates/AddTodoPage";
import { verifyToken } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

function AddTodo() {
  return <AddTodoPage />;
}

export default AddTodo;

export async function getServerSideProps({ req }) {
  await connectDB();
  const { token } = req.cookies;
  if (!token)
    return {
      redirect: { destination: "/auth/login", permanent: false },
    };
  const secretKey = process.env.SECRET_KEY;
  const verify = verifyToken(token, secretKey);
  if (!verify)
    return {
      redirect: { destination: "/auth/login", permanent: false },
    };
  return {
    props: { verify },
  };
}

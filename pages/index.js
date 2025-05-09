import HomePage from "@/components/templates/HomePage";
import User from "@/models/User";
import { verifyToken } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

function Index() {
  return <HomePage />;
}

export default Index;
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

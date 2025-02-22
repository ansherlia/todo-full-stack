import DashboardPage from "@/components/templates/DashboardPage";
import User from "@/models/User";
import { verifyToken } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

function Dashboard({ user, verify }) {
  return <DashboardPage data={user} email={verify} />;
}

export default Dashboard;

export async function getServerSideProps({ req }) {
  await connectDB();
  const { token } = req.cookies;
  if (!token)
    return {
      redirect: { destination: "/auth/login", permanent: false },
    };
  const secretKey = process.env.SECRET_KEY;
  const verify = verifyToken(token, secretKey);
  const user = await User.findOne({ email: verify?.email });
  if (!verify)
    return {
      redirect: { destination: "/auth/login", permanent: false },
    };
  console.log(user);
  const { name, lastName } = user;
  return {
    props: { verify, user: JSON?.parse(JSON.stringify({ name, lastName })) },
  };
}

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const signUpHandler = async () => {
    event.preventDefault();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") router.push("/auth/login");
      if (data.status === "failed")
        toast.error(data.message, {
          position: "top-center",
        });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center">
      <form className="flex flex-col bg-neutral-300/20 mt-40 py-14 px-6 rounded-lg items-center justify-center gap-y-4">
        <h2 className="mb-5 font-bold text-3xl text-gray-600 tracking-wider">
          Register
        </h2>
        <input
          type="text"
          placeholder="Email"
          className="input__element"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input__element"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={signUpHandler}
          className="bg-gray-500/30 text-gray-500 text-xl font-semibold w-[100%] py-2.5 rounded-md mt-3 hover:bg-gray-500/50 hover:text-gray-700 transition-colors"
        >
          Sign up
        </button>
        <div className="flex items-center gap-x-2 mt-4">
          <span className="text-lg">have an accout?</span>
          <Link href="/auth/login" className="text-blue-600">
            Login
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignUpPage;

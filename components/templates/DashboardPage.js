import { useRouter } from "next/router";
import { useState } from "react";

function DashboardPage({ data, email }) {
  const [form, setForm] = useState({ name: "", lastName: "", password: "" });
  const router = useRouter();

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const updateHandler = async () => {
    try {
      const res = await fetch("/api/update-user-info", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") router.reload();
      console.log(data);
    } catch (error) {}
  };

  return (
    <div className="m-10">
      <div className="text-3xl mb-10">
        <span className="font-semibold text-zinc-700">Email : </span>
        <span className="text-sky-700">{email.email}</span>
      </div>
      {data.name && (
        <>
          <div>
            <span className="font-semibold text-xl">Name : </span>
            <span className="text-xl text-green-600">{data.name}</span>
          </div>
          <div>
            <span className="font-semibold text-xl">Last Name : </span>
            <span className="text-xl text-green-600">{data.lastName}</span>
          </div>
        </>
      )}
      {!data.name && (
        <div className="flex flex-col gap-y-3" onChange={changeHandler}>
          <input
            type="text"
            placeholder="Name"
            className="input__element"
            name="name"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="input__element"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input__element"
          />  
          <button
            onClick={updateHandler}
            className="w-[350px] mt-3 font-semibold hover:text-white/50 transition-colors bg-gray-500/40 py-2 rounded-md text-xl"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;

import Link from "next/link";
import { RiMastodonLine } from "react-icons/ri";

function Task({ data, className, next, previous, fetchTodos }) {
  console.log(next);
  const changeStatusHandler = async (id, status) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    fetchTodos();
    console.log(data);
  };
  return (
    <div className="flex flex-col items-center justify-center mx-auto  gap-y-8 px-10 py-5 bg-gray-300 min-h-[270px] rounded-b-lg shadow-lg shadow-zinc-500">
      {data?.map((item) => (
        <div
          key={item._id}
          className="bg-white  lg:w-[260px] p-5 rounded-lg shadow-xl"
        >
          <span className={className}></span>
          <RiMastodonLine className="mt-8 mb-5" />
          <h2 className="text-justify">{item.title}</h2>
          <div className="flex items-center justify-between mt-10 border-t pt-10">
            {previous ? (
              <button
                onClick={() => changeStatusHandler(item._id, previous)}
                className="bg-red-400 px-2  text-sm py-0.5 rounded-sm text-white font-semibold shadow-md"
              >
                Previous
              </button>
            ) : null}
            <button className="bg-lime-500  text-sm px-2 py-0.5 rounded-sm text-white font-semibold shadow-md">
              <Link href={`/todos/${item._id}`}>Details</Link>
            </button>
            {next ? (
              <button
                onClick={() => changeStatusHandler(item._id, next)}
                className="bg-green-500 text-sm flex justify-end items-end  px-2 py-0.5 rounded-sm text-white font-semibold shadow-md"
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Task;

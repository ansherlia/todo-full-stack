import { useEffect, useState } from "react";
import Task from "../modules/Task";

function HomePage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setData(data);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 xl:grid-cols-4 lg:gap-x-20 xl:gap-x-4 justify-between text-center font-sans">
      <div className="w-[100%] my-4">
        <h2 className="bg-yellow-500 text-white py-1.5 text-lg font-semibold rounded-md">
          Todo
        </h2>
        <Task
          data={data.data?.todo}
          className="todo"
          next="inProgress"
          fetchTodos={fetchTodos}
        />
      </div>
      <div className="w-[100%] my-4">
        <h2 className="bg-green-600 text-white py-1.5 text-lg font-semibold rounded-md">
          In Progress
        </h2>
        <Task
          fetchTodos={fetchTodos}
          data={data.data?.inProgress}
          next="review"
          className="inProgress"
          previous="todo"
        />
      </div>
      <div className="w-[100%] my-4">
        <h2 className="bg-sky-500 text-white py-1.5 text-lg font-semibold rounded-md">
          Review
        </h2>
        <Task
          fetchTodos={fetchTodos}
          data={data.data?.review}
          className="review"
          next="done"
          previous="inProgress"
        />
      </div>
      <div className="w-[100%] my-4">
        <h2 className="bg-teal-600 text-white py-1.5 text-lg ?font-semibold rounded-md">
          Done
        </h2>
        <Task
          fetchTodos={fetchTodos}
          data={data.data?.done}
          className="done"
          previous="review"
        />
      </div>
    </div>
  );
}

export default HomePage;

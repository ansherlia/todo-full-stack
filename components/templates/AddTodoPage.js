import { AiOutlineFileSearch, AiOutlinePlusCircle } from "react-icons/ai";
import RadioButton from "../elements/RadioButton";
import { useState } from "react";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { IoMdDoneAll } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";

function AddTodoPage() {
  const [status, setStatus] = useState("todo");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodoHandler = async () => {
    console.log({ title, status, description });
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title, status, description }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      toast.success(data.message, {
        position: "top-center",
      });
      setTitle("");
      setDescription("");
    } else if (data.status === "failed") {
      toast.error(data.message, {
        position: "top-center",
      });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center md:items-start  md:px-4 py-10 font-sans text-zinc-600">
      <div className="flex items-center gap-x-2 mb-10">
        <AiOutlinePlusCircle className="text-3xl " />
        <h2 className="text-2xl font-bold">Add New Todo</h2>
      </div>
      <label className="text-xl font-semibold pb-2">Title :</label>
      <input
        className="input__element mb-10"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label className="text-xl font-semibold pb-2">Description :</label>
      <textarea
        className="w-[100%] md:w-[350px] h-[250px] rounded-md focus:outline-none p-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex flex-col gap-y-3 mt-10 ">
        <RadioButton
          className="todo"
          status={status}
          setStatus={setStatus}
          title="Todo"
          value="todo"
        >
          <BsAlignStart />
        </RadioButton>
        <RadioButton
          className="inProgress"
          status={status}
          setStatus={setStatus}
          title="In Proggress"
          value="inProgress"
        >
          <FiSettings />
        </RadioButton>
        <RadioButton
          className="review"
          status={status}
          setStatus={setStatus}
          title="Review"
          value="review"
        >
          <AiOutlineFileSearch />
        </RadioButton>
        <RadioButton
          className="done"
          status={status}
          setStatus={setStatus}
          title="Done"
          value="done"
        >
          <IoMdDoneAll />
        </RadioButton>
      </div>
      <button
        onClick={addTodoHandler}
        className="w-[100%] md:w-[350px] mt-10 text-xl font-semibold hover:bg-gray-500/70 transition-colors bg-gray-500 text-white py-2 px-4 rounded-md"
      >
        Add
      </button>
      <ToastContainer />
    </div>
  );
}

export default AddTodoPage;

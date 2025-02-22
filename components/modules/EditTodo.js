import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import RadioButton from "../elements/RadioButton";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { BsAlignStart } from "react-icons/bs";
import { IoMdDoneAll } from "react-icons/io";

function EditTodo({ data, id }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const updateHandler = async () => {
    event.preventDefault();
    const res = await fetch("/api/update-todo", {
      method: "POST",
      body: JSON.stringify({ id, title, status, description }),
      headers: { "Content-Type": "application/json" },
    });
    const data1 = await res.json();
    console.log(data1);
    if (data1.status === "success") {
      setTitle("");
      setStatus("");
      setDescription("");
      toast.success("Todo updated successfull", {
        position: "top-center",
      });
      router.reload();
    } else if (data1.status === "failed") {
      toast.error(data1.message, {
        position: "top-center",
      });
    }
  };

  return (
    <form className="flex flex-col md:w-[200px] lg:w-[400px] xl:w-[600px] gap-y-5 ">
      <h3 className="text-center bg-gray-400 text-2xl py-2 w-fit mx-auto px-5 rounded-md text-white mt-5 ">
        Update Form
      </h3>
      <input
        type="text"
        className="p-2 rounded-lg w-[100%] focus:outline-none"
        placeholder="New Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        className="p-2 rounded-lg w-[100%] focus:outline-none"
        placeholder="New Desc"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex flex-col gap-y-5  text-gray-300">
        <RadioButton
          status={status}
          setStatus={setStatus}
          value="todo"
          title="Todo"
          className="todo"
        >
          <BsAlignStart />
        </RadioButton>
        <RadioButton
          status={status}
          setStatus={setStatus}
          value="inProgress"
          title="In Progress"
          className="inProgress"
        >
          <FiSettings />
        </RadioButton>
        <RadioButton
          status={status}
          setStatus={setStatus}
          value="review"
          title="Review"
          className="review"
        >
          <AiOutlineFileSearch />
        </RadioButton>
        <RadioButton
          status={status}
          setStatus={setStatus}
          value="done"
          title="Done"
          className="done"
        >
          <IoMdDoneAll />
        </RadioButton>
      </div>
      <button
        onClick={updateHandler}
        className="text-xl  bg-gray-500/20 px-10 py-1 hover:bg-gray-500/50 transition-colors text-white rounded-md"
      >
        Update
      </button>
      <ToastContainer />
    </form>
  );
}

export default EditTodo;

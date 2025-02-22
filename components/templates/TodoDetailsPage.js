import EditTodo from "../modules/EditTodo";

function TodoDetailsPage({ data }) {
  console.log(data);
  return (
    <div className="flex flex-col  md:flex-row justify-between lg:mx- xl:mx-50 gap-y-10 gap-x-5 lg:gap-x-20 mt-10">
      <div>
        <h2 className="bg-green-500 py-2 px-5 rounded-md w-fit text-gray-300 text-xl md:text-2xl font-bold">
          Todo Details
        </h2>
        <div>
          <div className="flex gap-x-14 mt-10 ">
            <h4 className="text-xl text-zinc-600 bg-yellow-500 px-3 py-1 rounded-md">
              Title : {data?.title}
            </h4>
            <h4 className="text-xl text-zinc-600 bg-sky-500 px-3 py-1 rounded-md">
              Status : {data?.status}
            </h4>
          </div>
          <p className="text-xl max-w-[850px] mt-10 text-zinc-600 bg-gray-200 px-3 py-1 rounded-md">
            Description : {data?.description}
          </p>
        </div>
      </div>
      <EditTodo data={data} id={data._id}/>
    </div>
  );
}

export default TodoDetailsPage;

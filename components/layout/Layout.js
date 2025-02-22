import Link from "next/link";
import { LuListMinus } from "react-icons/lu";
import { BsPlusSquareDotted } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";

function Layout({ children }) {
  return (
    <>
      <header className="flex justify-center md:justify-start bg-blue-700 h-[112px] text-white pt-2 px-5 ">
        <h2 className="text-2xl">ReOshel Todo App</h2>
      </header>
      <div className="flex flex-col md:flex-row  text-zinc-700">
        <aside className="relative flex flex-col bg-rose-400 text-zinc-200 md:text-zinc-700 md:bg-white bottom-14 md:w-[240px] md:rounded-tr-xl md:rounded-br-xl text-center py-6 md:min-h-screen">
          <h2 className="text-xl font-bold mb-4">Welcome 👋</h2>
          <ul className="flex gap-x-5 sm:gap-x-16 md:gap-x-0 md:flex-col gap-y-4 mt-5 mx-auto">
            <li className="flex items-center gap-x-1.5 ">
              <LuListMinus />
              <Link href={`/`}>Todos</Link>
            </li>
            <li className="flex items-center gap-x-1.5 ">
              <BsPlusSquareDotted />

              <Link href={`/add-todo`}>Add Todo</Link>
            </li>
            <li className="flex items-center gap-x-1.5 ">
              <RxDashboard />

              <Link href="/dashboard">Profile</Link>
            </li>
          </ul>
        </aside>
        <main className="w-[100%] px-5">{children}</main>
      </div>
      <footer></footer>
    </>
  );
}

export default Layout;

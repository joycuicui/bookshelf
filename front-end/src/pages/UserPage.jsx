import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const UserPage = () => {
  return (
    <main className="flex">
      <Sidebar />
      <article className="ml-48 bg-gray-50 p-6 flex-grow min-h-screen">
        <Outlet />
      </article>
    </main>
  );
};

export default UserPage;

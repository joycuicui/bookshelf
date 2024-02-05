import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const UserPage = () => {
  return (
    <>
      <Sidebar />
      <main className="ml-64 bg-gray-50">
        <Outlet />
      </main>
    </>
  );
};

export default UserPage;

import { NavLink } from "react-router-dom";
import {
  HiOutlineBookOpen,
  HiOutlineQueueList,
  HiOutlineStar,
  HiOutlineCog8Tooth,
} from "react-icons/hi2";

const Sidebar = () => {
  return (
    <aside className="fixed border-r-2 border-gray-100 gap-3 w-64 p-3 h-screen">
      <ul className="flex flex-row sm:flex-col gap-3">
        <li className="p-3 pl-7 items-center text-gray-600 text-lg font-medium hover:bg-gray-100 hover:rounded-lg visited:bg-gray-300">
          <NavLink to="/user/books" className="flex gap-2">
            <HiOutlineBookOpen className="text-xl w-7 h-7 text-gray-400" />
            <span>My Progress</span>
          </NavLink>
        </li>
        <li className="p-3 pl-7 items-center text-gray-600 text-lg font-medium hover:bg-gray-100 hover:rounded-lg">
          <NavLink to="/user/lists" className="flex gap-2">
            <HiOutlineQueueList className="text-xl w-7 h-7 text-gray-400" />
            <span>My Lists</span>
          </NavLink>
        </li>
        <li className="p-3 pl-7 items-center text-gray-600 text-lg font-medium hover:bg-gray-100 hover:rounded-lg">
          <NavLink to="/user/reviews" className="flex gap-2">
            <HiOutlineStar className="text-xl w-7 h-7 text-gray-400" />
            <span>My Reviews</span>
          </NavLink>
        </li>
        <li className="p-3 pl-7 items-center text-gray-600 text-lg font-medium hover:bg-gray-100 hover:rounded-lg">
          <NavLink to="/user/settings" className="flex gap-2">
            <HiOutlineCog8Tooth className="text-xl w-7 h-7 text-gray-400" />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

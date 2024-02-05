import { Link, useNavigate } from "react-router-dom";
import {
  HiMagnifyingGlass,
  HiMiniArrowRightOnRectangle,
} from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { logoutSuccess } from "../redux/user/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search");
  };

  const handleLogout = async (e) => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();
      // console.log(data);

      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      dispatch(logoutSuccess());
      toast.success("Logged out successfully");
      setTimeout(() => {
        return navigate("/");
      }, 2000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <header className="bg-emerald-50 shadow-sm border-b-2 border-gray-100">
      <div className="flex justify-between items-center mx-2 sm:mx-10 p-3 sm:py-4">
        <Link to="/" className="font-bold text-sm sm:text-2xl">
          <span className="text-emerald-600">Book</span>
          <span className="text-emerald-800">Haven</span>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-emerald-100 p-1 rounded-full flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Search..."
            className="outline-none w-28 rounded-full bg-emerald-100 px-4 py-2  transition-all duration-300 focus:ring focus:ring-emerald-300 focus:ring-opacity-50 sm:w-72 sm:focus:w-96"
          />
          <button type="submit">
            <HiMagnifyingGlass className="text-emerald-600 mr-2 text-lg cursor-pointer" />
          </button>
        </form>
        <ul className="flex gap-4 text-sm sm:text-lg text-emerald-900 font-medium items-center">
          <li>
            <Link to="/" className="hidden sm:inline hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hidden sm:inline hover:underline">
              About
            </Link>
          </li>
          {currentUser ? (
            <div className="flex gap-3 ml-3">
              <li>
                <Link to="/user" className="hover:underline">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt="User Avatar" />
                  ) : (
                    <img
                      src="/default-user.jpg"
                      alt="Default User Avatar"
                      className="button-effect rounded-full w-9 h-9"
                    />
                  )}
                </Link>
              </li>
              <li
                onClick={handleLogout}
                className="button-effect rounded-full bg-emerald-600 text-white p-2 hover:bg-emerald-700 cursor-pointer text-xl w-9 h-9"
              >
                <HiMiniArrowRightOnRectangle />
              </li>
            </div>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:underline">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/signup" className=" hover:underline">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;

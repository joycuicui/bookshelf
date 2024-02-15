import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiMagnifyingGlass,
  HiMiniArrowRightOnRectangle,
} from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";

import { logoutSuccess } from "../redux/user/userSlice";

const Header = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchTerm}`
      );
      const result = await response.json();
      setSearchResults(result.docs);
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm("");
    } catch (err) {
      setError(err.message);
    }
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
        return navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleImageError = (e) => {
    e.target.src = "/default-user.jpg";
  };

  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`sticky top-0 z-50 bg-emerald-50 border-gray-100 ${
        !isHomePage ? "shadow-sm border-p-2" : ""
      }`}
    >
      <div className="flex justify-between items-center mx-2 sm:mx-10 p-3 sm:py-4">
        <Link to="/" className="font-bold text-sm sm:text-xl">
          <span className="text-emerald-600">Book</span>
          <span className="text-emerald-800">Haven</span>
        </Link>
        <form
          onSubmit={handleSearch}
          className="bg-emerald-100 p-1 rounded-full flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-xs outline-none w-28 rounded-full bg-emerald-100 px-2 py-1 transition-all duration-300 focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50 sm:w-72 sm:focus:w-96"
          />
          <button type="submit">
            <HiMagnifyingGlass className="text-emerald-600 mr-2 text-lg cursor-pointer" />
          </button>
        </form>
        <ul className="flex gap-4 text-sm text-emerald-900 font-medium items-center">
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
                <Link to="/user/lists" className="hover:underline">
                  <img
                    src={
                      currentUser.avatar
                        ? currentUser.avatar
                        : "/default-user.jpg"
                    }
                    onError={handleImageError}
                    alt="User Avatar"
                    className="button-effect rounded-full w-8 h-8"
                  />
                </Link>
              </li>
              <li
                onClick={handleLogout}
                className="button-effect rounded-full bg-emerald-600 text-white p-2 hover:bg-emerald-700 cursor-pointer text-xl w-8 h-8"
              >
                <HiMiniArrowRightOnRectangle className="pb-0.5" />
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

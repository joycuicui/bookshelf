import { Link, useNavigate } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";

const Header = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search");
  };

  return (
    <header className="bg-emerald-50 shadow-sm">
      <div className="flex justify-between items-center mx-2 sm:mx-10 p-3 sm:py-4">
        <h1 className="font-bold text-sm sm:text-2xl">
          <span className="text-emerald-600">Book</span>
          <span className="text-emerald-800">Haven</span>
        </h1>
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
        <ul className="flex gap-4 text-sm sm:text-lg text-emerald-900 font-medium">
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
          <li>
            <Link to="/login" className=" hover:underline">
              Log In
            </Link>
          </li>
          <li>
            <Link to="/signup" className=" hover:underline">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;

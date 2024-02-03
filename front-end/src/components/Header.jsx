import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-emerald-50 shadow-sm">
      <div className="flex justify-between items-center mx-2 sm:mx-10 p-3 sm:py-4">
        <h1 className="font-bold text-sm sm:text-2xl">
          <span className="text-emerald-600">Book</span>
          <span className="text-emerald-800">Haven</span>
        </h1>
        <form className="bg-emerald-100 p-3 rounded-full">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
        </form>
        <ul className="flex gap-4 text-sm sm:text-lg text-emerald-900 font-medium">
          <Link to="/">
            <li className="hidden sm:inline hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline">About</li>
          </Link>
          <Link to="/login">
            <li className=" hover:underline">Log In</li>
          </Link>
          <Link to="/signup">
            <li className=" hover:underline">Sign Up</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;

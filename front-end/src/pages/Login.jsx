import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import ReadingSvg2 from "../assets/reading2.svg";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice";

const formatName = (name) => {
  if (name.includes(" ")) {
    return name
      .split(" ")
      .map((el) => el.charAt(0).toUpperCase() + el.slice(1).toLowerCase())
      .join(" ");
  } else {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);

      if (data.success === false) {
        // setError(data.message);
        dispatch(loginFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(loginSuccess(data));
      const formattedName = formatName(data.name);
      toast(`Welcome back, ${formattedName}!`, { icon: "🎉" });
      setTimeout(() => {
        return navigate("/user/books");
      }, 2000);
    } catch (err) {
      dispatch(loginFailure(err.message));
      toast.error(err.message);
    }
  };

  return (
    <div onSubmit={handleSubmit} className="p-3 max-w-lg mx-auto">
      <img
        src={ReadingSvg2}
        alt="Reading Books"
        className="w-44 mx-auto mt-3"
      />
      <h1 className="text-2xl text-center font-semibold my-7 text-gray-700">
        Log In
      </h1>
      <form className="flex flex-col gap-4">
        <div className="relative">
          <input
            onChange={handleChange}
            type="email"
            id="email"
            placeholder=" "
            required
            className="block p-2 pt-3 w-full text-xs text-gray-900 bg-transparent border-2 border-gray-500 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
          />
          <label
            htmlFor="email"
            className="absolute text-xs text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Email
          </label>
        </div>

        <div className="relative">
          <input
            onChange={handleChange}
            type="password"
            id="password"
            placeholder=" "
            required
            className="block p-2 pt-3 w-full text-xs text-gray-900 bg-transparent border-2 border-gray-500 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
          />
          <label
            htmlFor="password"
            className="absolute text-xs text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Password
          </label>
        </div>

        <button
          disabled={loading}
          className="text-sm button-effect tracking-wider mt-2 bg-emerald-700 text-white p-2 rounded-xl uppercase disabled:opacity-80 disabled:cursor-wait"
        >
          {loading ? "loading..." : "log in"}
        </button>
      </form>
      <div className="flex gap-2 mt-7 text-sm">
        <p>{"Don't have an account?"}</p>
        <Link to="/signup" className="text-slate-700">
          <span className="text-blue-700 underline">Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;

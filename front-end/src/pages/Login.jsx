import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div onSubmit={handleSubmit} className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-emerald-950">
        Log In
      </h1>
      <form className="flex flex-col gap-5">
        <div className="relative">
          <input
            onChange={handleChange}
            type="email"
            id="email"
            placeholder=" "
            className="block p-3 pt-4 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-500 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
          />
          <label
            htmlFor="email"
            className="absolute text-base text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
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
            className="block p-3 pt-4 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-500 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
          />
          <label
            htmlFor="password"
            className="absolute text-base text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Password
          </label>
        </div>

        <button
          disabled={loading}
          className="mt-2 bg-emerald-700 text-white p-3 rounded-xl uppercase shadow-md duration-300 transform ease-in-out hover:shadow-lg hover:-translate-y-1 active:translate-y-0 disabled:opacity-80 disabled:cursor-wait"
        >
          {loading ? "loading..." : "log in"}
        </button>
      </form>
      <div className="flex gap-2 mt-7">
        <p>{"Don't have an account?"}</p>
        <Link to="/signup" className="text-slate-700">
          <span className="text-blue-700 underline">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default Login;

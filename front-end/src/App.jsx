import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Header from "./components/Header";
import Search from "./pages/Search";
import UserPage from "./pages/UserPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import MyBooks from "./pages/MyBooks";
import MyLists from "./pages/MyLists";
import MyReviews from "./pages/MyReviews";
import MySettings from "./pages/MySettings";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="user" element={<UserPage />}>
              <Route path="books" element={<MyBooks />} />
              <Route path="lists" element={<MyLists />} />
              <Route path="reviews" element={<MyReviews />} />
              <Route path="settings" element={<MySettings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "",
            color: "",
          },
        }}
      />
    </>
  );
};

export default App;

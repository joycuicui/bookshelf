import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
import MyProgress from "./pages/MyProgress";
import MyLists from "./pages/MyLists";
import MyReviews from "./pages/MyReviews";
import MySettings from "./pages/MySettings";
import MyProfile from "./pages/MyProfile";
import BookDetailsPage from "./pages/BookDetails";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="books/:id" element={<BookDetailsPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="user" element={<UserPage />}>
              <Route path="books" element={<MyProgress />} />
              <Route path="lists" element={<MyLists />} />
              <Route path="reviews" element={<MyReviews />} />
              <Route path="profile" element={<MyProfile />} />
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
            fontSize: "14px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "",
            color: "",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;

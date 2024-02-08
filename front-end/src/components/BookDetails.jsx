import Sidebar from "./Sidebar";

const BookDetailsPage = () => {
  return (
    <main className="flex">
      <Sidebar />
      <article className="ml-64 bg-gray-50 p-8 flex-grow min-h-screen">
        <Outlet />
      </article>
    </main>
  );
};

export default BookDetailsPage;
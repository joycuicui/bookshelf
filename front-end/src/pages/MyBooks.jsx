import MyBookItem from "../components/MyBookItem";

const MyBooks = () => {
  return (
    <div>
      <h1 className="text-gray-600 font-semibold text-2xl">My Books</h1>
      <MyBookItem />
      <MyBookItem />
    </div>
  );
};
export default MyBooks;

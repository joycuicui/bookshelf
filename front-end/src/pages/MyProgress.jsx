import MyBookItem from "../components/MyBookItem";
import { useProgress } from "../query/useProgress";

// const testBooks = [
//   {
//     id: 1,
//     title: "A Tale of Two Cities",
//     author: "Charles Dickens",
//     cover_image: "default-cover-image.png",
//   },
//   {
//     id: 2,
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     cover_image: "default-cover-image.png",
//   },
// ];

const MyProgress = () => {
  const { isLoading, progress } = useProgress();
  // console.log("progress", progress);

  const mappedBooks = progress
    ?.filter((book) => book.list_id === 2)
    .map((book) => <MyBookItem key={book.id} book={book} />);

  if (isLoading) return <div className="spinner"></div>;

  return (
    <div>
      <h1 className="text-gray-600 font-semibold text-2xl">My Progress</h1>
      {mappedBooks}
    </div>
  );
};

export default MyProgress;

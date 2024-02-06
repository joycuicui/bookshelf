import MyBookItem from "../components/MyBookItem";

const testBooks = [
  {
    id: 1,
    title: "A Tale of Two Cities",
    author: "Charles Dickens",
    cover_image: "default-cover-image.png",
  },
  {
    id: 2,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover_image: "default-cover-image.png",
  },
];

const MyBooks = () => {
  const mappedBooks = testBooks.map((book) => (
    <MyBookItem key={book.id} book={book} />
  ));

  return (
    <div>
      <h1 className="text-gray-600 font-semibold text-2xl">My Books</h1>
      {mappedBooks}
    </div>
  );
};

export default MyBooks;

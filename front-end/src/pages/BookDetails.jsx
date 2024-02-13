import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import { HiChevronDown } from "react-icons/hi2";
import { useSelector } from "react-redux";

const BookDetailsPage = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`/api/books/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await response.json();
        console.log(data);
        setBook(data[0]);
        console.log("Book State: ", book);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleNewRating = (newRating) => {
    setNewRating(newRating);
  };

  console.log(newRating);

  if (!book) {
    return <div>Could not find details about book</div>;
  }

  return (
    <div className="flex flex-column px-52 py-14 gap-20 bg-gray-100 min-h-screen">
      <div className="flex flex-col gap-3">
        <div className="relative overflow-hidden shadow-lg mb-7">
          <img
            src={book.cover_image_medium}
            alt="Book Cover"
            className="w-56 h-80 object-cover"
          />
        </div>
        <div className="mx-auto mb-2">
          <StarRating
            isEditing={true}
            bookDetail={true}
            rating={0}
            onChange={handleNewRating}
          />
        </div>
        <div className="mx-auto">
          <button
            onClick={handleDropdown}
            type="button"
            className="text-gray bg-emerald-300 hover:bg-emerald-400 focus:ring-4 focus:outline-none focus:ring-emerald-200 font-medium rounded-lg text-xs px-12 py-2 text-center inline-flex items-center"
          >
            Add to list
            <span className="ml-2">
              <HiChevronDown />
            </span>
          </button>
          <div
            id="dropdown"
            className={`${
              showDropdown ? "block" : "hidden"
            } z-10 bg-white rounded-lg shadow`}
          >
            {showDropdown && (
              <ul className="py-2 text-xs text-gray-700">
                <li
                  // onClick={handleMoveToWant}
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Want To Read
                </li>
                <li
                  // onClick={handleMoveToWant}
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Currently Reading
                </li>
                <li
                  // onClick={handleMoveToRead}
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Read
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="w-2/3">
        <h1 className="text-2xl font-semibold text-gray-700 mb-3">
          {book.title}
        </h1>

        <div className="flex flex-col gap-3">
          <p>
            <span className="italic">by {book.author_names}</span>
          </p>
          <p className="text-gray-700">
            <span className="text-emerald-700 mr-2 italic">&#10077;</span>
            {book.description}
            <span className="text-emerald-700 ml-2 italic">&#10078;</span>
          </p>
          <p>
            <span className="font-semibold text-gray-600 mr-2">Genre:</span>
            {book.genre_names}
          </p>
          <p>
            <span className="font-semibold text-gray-600 mr-2">Publisher:</span>
            {book.publisher}
          </p>
          <p>
            <span className="font-semibold text-gray-600 mr-2">
              First Published:
            </span>
            {book.published_year}
          </p>
          <p>
            <span className="font-semibold text-gray-600 mr-2">ISBN:</span>
            {book.isbn}
          </p>

          {/* <p>
            <span className="font-semibold">In Book List:</span>
            {book.in_book_list}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;

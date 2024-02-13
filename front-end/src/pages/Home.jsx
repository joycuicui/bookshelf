import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ReadingSvg3 from "../assets/reading3.svg";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books/all");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
        setLoading(false);
        console.log("home data: ", data);
      } catch (error) {
        console.error("home : ", error);

        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <>
      <div className="flex min-h-[32rem] bg-emerald-50">
        <div className="item-center justify-center flex flex-col gap-6 p-28 px-3 max-w-4xl mx-auto flex-grow">
          <h1 className="text-gray-700 font-bold text-5xl">
            Explore the World of <span className="text-gray-500">Words</span>
          </h1>
          <div className="text-gray-400 text-xs sm:text-sm">
            Embark on literary journeys with BookHaven. Explore diverse books,
            track your progress, and curate your personal virtual bookshelf.
            Join today and let storytelling ignite your imagination.
          </div>
          <span>
            <Link
              to={"/login"}
              className="text-xs sm:text-sm text-amber-600 font-bold hover:underline"
            >
              Starting Reading Today &#10132;
            </Link>
          </span>
        </div>
        <img
          src={ReadingSvg3}
          alt="Reading Books"
          className="w-56 mx-auto mt-3"
        />
      </div>
      <div className="mx-16 my-8">
        <h1 className="text-gray-600 font-semibold text-lg p-8">
          Our Reading Enjoy Reading...
        </h1>
        {/* overflow-hidden w-[650px] flex flex-col px-8 gap-6 */}
        <div className="px-8 mx-4">
          <Slider {...settings}>
            {/* <div className="flex flex-wrap justify-center gap-6"> */}
            {books.map((book) => (
              <Link
                to={`/books/${book.id}`}
                className="bg-white mx-10 mt-3 mb-8 border border-gray-300 rounded-lg shadow max-w-52"
                key={book.id}
              >
                <img
                  src={book.cover_image_medium}
                  alt="Book Cover"
                  className="w-56 h-80 object-cover rounded-t-lg"
                />
                <div className="flex flex-col px-2 py-3 truncate">
                  <p className="text-gray-700 font-semibold truncate">
                    {book.title}
                  </p>
                  <p className="italic text-gray-500 text-xs truncate">
                    by {book.author_name}
                  </p>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
      <footer className="bg-neutral-50 mt-20 border-t p-5 text-gray-500 text-xs flex flex-col justify-center items-center gap-2">
        <div className="flex gap-3">
          <Link to="/home" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/search" className="hover:underline">
            Search
          </Link>
        </div>
        <div>&copy; {new Date().getFullYear()} BookHaven</div>
      </footer>
    </>
  );
};
export default Home;

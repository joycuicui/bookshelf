import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import StarRating from "./StarRating";
import { useAddReview } from "../query/useAddReview";

const AddReview = ({ books, onCloseModal }) => {
  const { isAdding, addReview } = useAddReview();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="overflow-hidden w-[800px] flex flex-col p-10 gap-6">
      <Slider {...settings}>
        {books.map((book) => (
          <BookCarousel
            key={book.book_author_id}
            book={book}
            onCloseModal={onCloseModal}
            addReview={addReview}
          />
        ))}
      </Slider>
    </div>
  );
};

export default AddReview;

const BookCarousel = ({ book, onCloseModal, addReview }) => {
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  const {
    book_author_id: bookAuthorId,
    title,
    author,
    cover_image,
    first_published,
  } = book;

  const handleNewRating = (newRating) => {
    setNewRating(newRating);
  };

  const handleNewReview = (e) => {
    setNewReview(e.target.value);
  };

  const handleSubmitNewReview = async (e) => {
    e.preventDefault();
    await addReview({ bookAuthorId, rating: newRating, review: newReview });
    onCloseModal();
  };

  const handleImageError = (e) => {
    e.target.src = "/default-cover-image.png";
  };

  return (
    <form onSubmit={handleSubmitNewReview}>
      <div className="px-4">
        <div className="flex justify-between gap-8">
          <img
            src={cover_image}
            onError={handleImageError}
            alt="Book Cover"
            className="w-28 h-40 rounded-sm border"
          />
          <div className="flex flex-col gap-2 flex-grow">
            <p className="text-gray-700 font-semibold text-xl pt-2 truncate">
              {title}
            </p>
            <p className="italic">by {author}</p>
            <div>First Published: {first_published}</div>
            <StarRating
              ratedRating={0}
              isEditing={true}
              onChange={handleNewRating}
            />
          </div>
        </div>
        <div>
          <textarea
            type="text"
            onChange={handleNewReview}
            placeholder="Write your review here..."
            className="mt-3 p-2 border border-gray-300 shadow-sm rounded-sm w-full h-64"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 my-5">
        <button
          onClick={onCloseModal}
          type="reset"
          className="px-5 py-2 text-gray-600 bg-white border rounded-lg shadow-sm border-gray-200 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 text-gray-600 bg-white border rounded-lg shadow-sm border-gray-200 hover:bg-emerald-200"
        >
          Add Review
        </button>
      </div>
    </form>
  );
};

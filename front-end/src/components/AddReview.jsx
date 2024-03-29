import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import StarRating from "./StarRating";
import { useAddReview } from "../query/useAddReview";

const AddReview = ({ books, onCloseModal }) => {
  const { isAdding, addReview } = useAddReview();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="overflow-hidden w-[650px] flex flex-col px-8 gap-6">
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
      <div className="px-2">
        <div className="flex justify-between gap-8">
          <img
            src={cover_image ? cover_image : "/default-cover-image.png"}
            onError={handleImageError}
            alt="Book Cover"
            className="w-28 h-40 rounded-sm border"
          />
          <div className="flex flex-col gap-2 flex-grow">
            <p className="text-gray-700 font-semibold text-lg pt-2 truncate">
              {title}
            </p>
            <p className="italic text-sm">by {author}</p>
            <div className="text-sm">
              First Published: {first_published ? first_published : "n/a"}
            </div>
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
            className="text-[13px] mt-3 p-2 border border-gray-300 shadow-sm rounded-sm w-full h-60"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-3">
        <button
          onClick={onCloseModal}
          type="reset"
          className="text-sm px-4 py-1 text-gray-600 bg-white border rounded-lg shadow-sm border-gray-200 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-sm px-4 py-1 text-gray-600 bg-white border rounded-lg shadow-sm border-gray-200 hover:bg-emerald-200"
        >
          Add Review
        </button>
      </div>
    </form>
  );
};

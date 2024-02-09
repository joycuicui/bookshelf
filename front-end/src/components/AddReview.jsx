import Slider from "react-slick";
import StarRating from "./StarRating";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AddReview = ({ books, onCloseModal }) => {
  return (
    <form
      // onSubmit={handleSubmitEditReview}
      className="overflow-hidden w-[800px] flex flex-col p-10 gap-6"
    >
      <BookCarousel books={books} />
      <div className="flex justify-end gap-3 mt-5">
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

export default AddReview;

const BookCarousel = ({ books }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {books.map((book) => (
        <div key={book.id} className="px-4">
          <div className="flex justify-between gap-8">
            <img
              src={book.cover_image}
              alt="Book Cover"
              className="w-28 h-40 rounded-sm border"
            />
            <div className="flex flex-col gap-2 flex-grow">
              <p className="text-gray-700 font-semibold text-xl pt-2 truncate">
                {book.title}
              </p>
              <p className="italic">by {book.author}</p>
              <div>First Published: {book.first_published}</div>
              <StarRating
                ratedRating={0}
                isEditing={true}
                // onChange={handleRatingChange}
              />
            </div>
          </div>
          <div>
            <textarea
              type="text"
              // onChange={handleReviewChange}
              // defaultValue={review}
              className="mt-3 p-2 border border-gray-300 shadow-sm rounded-sm w-full h-64"
            />
          </div>
        </div>
      ))}
    </Slider>
  );
};

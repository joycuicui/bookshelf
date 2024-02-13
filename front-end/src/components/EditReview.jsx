import { useState } from "react";
import StarRating from "./StarRating";
import { useEditReview } from "../query/useEditReview";

const EditReview = ({ book, onCloseModal }) => {
  const [editedReview, setEditedReview] = useState(book.review);
  const [editedRating, setEditedRating] = useState(book.rating);
  const { isEditing, editReview } = useEditReview();

  const {
    id: reviewId,
    title,
    author,
    cover_image,
    first_published,
    review,
    rating,
  } = book;

  const handleRatingChange = (newRating) => {
    setEditedRating(newRating);
  };

  const handleReviewChange = (e) => {
    setEditedReview(e.target.value);
  };

  const handleSubmitEditReview = async (e) => {
    e.preventDefault();
    await editReview({ reviewId, rating: editedRating, review: editedReview });
    onCloseModal();
  };

  const handleImageError = (e) => {
    e.target.src = "/default-cover-image.png";
  };

  return (
    <form
      onSubmit={handleSubmitEditReview}
      className="overflow-hidden w-[650px] flex flex-col p-6 gap-4"
    >
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
            ratedRating={rating}
            isEditing={true}
            onChange={handleRatingChange}
          />
        </div>
      </div>
      <div>
        <textarea
          type="text"
          onChange={handleReviewChange}
          defaultValue={review}
          className="text-[13px] p-2 border border-gray-300 shadow-sm rounded-sm w-full h-52"
        />
      </div>
      <div className="flex justify-end gap-3">
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
          Edit Review
        </button>
      </div>
    </form>
  );
};
export default EditReview;

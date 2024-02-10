import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HiArrowSmallDown, HiArrowSmallUp } from "react-icons/hi2";

import SortBy from "../components/SortBy";
import StarRating from "../components/StarRating";
import Modal from "../components/Modal";
import EditReview from "../components/EditReview";
import { useReviews } from "../query/useReviews";
import { useDeleteReview } from "../query/useDeleteReview";
import { useReadingLists } from "../query/useReadingLists";
import AddReview from "../components/AddReview";

const MyReviews = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { readingLists: allBooksInLists } = useReadingLists();

  const { isLoading, reviews } = useReviews();
  const [searchParams] = useSearchParams();

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  // SORTING
  const sortBy = searchParams.get("sortBy") || "title-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedReviews = reviews?.slice().sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];
    return (aValue < bValue ? -1 : aValue > bValue ? 1 : 0) * modifier;
  });

  const mappedReviews = sortedReviews?.map((book) => (
    <MyReviewCard key={book.id} book={book} />
  ));

  if (isLoading) return <div className="spinner"></div>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-gray-600 font-semibold text-xl">My Reviews</h1>
        <div className="flex gap-2">
          <button
            onClick={handleOpenAddModal}
            className="font-semibold text-gray-700  bg-emerald-300 hover:bg-emerald-400 focus:ring-4 focus:outline-none focus:ring-emerald-200 rounded-lg px-5 py-2.5 text-center inline-flex items-center"
          >
            <span className="text-xs mr-2">+</span>
            <span className="text-xs">Write a New Review</span>
          </button>
          <SortBy
            options={[
              { value: "title-asc", label: "Sort by title (A-Z)" },
              { value: "title-desc", label: "Sort by title (Z-A)" },
              { value: "author-asc", label: "Sort by author (A-Z)" },
              { value: "author-desc", label: "Sort by author (Z-A)" },
              { value: "rating-asc", label: "Sort by rating (lowest first)" },
              {
                value: "rating-desc",
                label: "Sort by rating (highest first)",
              },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4">{mappedReviews}</div>
      {addModalOpen && (
        <Modal onCloseModal={handleCloseAddModal}>
          <AddReview
            onCloseModal={handleCloseAddModal}
            books={allBooksInLists}
          />
        </Modal>
      )}
    </div>
  );
};

export default MyReviews;

const REVIEW_LIMIT = 540;

const MyReviewCard = ({ book }) => {
  const { isDeleting, deleteReview } = useDeleteReview();
  const [showFullReview, setShowFullReview] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const {
    id: reviewId,
    title,
    author,
    cover_image,
    first_published,
    review,
    rating,
  } = book;

  const toggleShowFullReview = () => {
    setShowFullReview(!showFullReview);
  };

  const handleOpenEditModal = () => {
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleImageError = (e) => {
    e.target.src = "/default-cover-image.png";
  };

  return (
    <div className="mx-10 mt-7 p-2 flex flex-col gap-2 border border-gray-300 rounded-lg shadow w-[37rem] h-[21rem] overflow-auto">
      <div className="flex justify-between pt-1">
        <img
          src={cover_image}
          onError={handleImageError}
          alt="Book Cover"
          className="w-24 h-32 rounded-sm mx-4"
        />
        <div className="flex flex-col gap-2 flex-grow">
          <p className="text-gray-700 font-semibold text-base pt-2 truncate">
            {title}
          </p>
          <p className="italic text-sm">by {author}</p>
          <div className="text-sm">First Published: {first_published}</div>
          <StarRating ratedRating={rating} />
        </div>
        <div className="flex gap-2 items-start m-2">
          <button
            onClick={handleOpenEditModal}
            className="hover:underline text-emerald-600 text-sm"
          >
            EDIT
          </button>
          <button
            onClick={() => deleteReview({ reviewId })}
            className="hover:underline text-red-600 text-sm"
          >
            DELETE
          </button>
        </div>
      </div>
      <div className="border-t-[1px] p-3 mb-0 pb-0">
        {review === null || review?.length <= REVIEW_LIMIT ? (
          <p className="text-[13px]">{review}</p>
        ) : showFullReview ? (
          <p className="text-[13px]">{review}</p>
        ) : (
          <p className="text-[13px]">
            {review?.slice(0, REVIEW_LIMIT)}
            <span className="text-emerald-700 font-semibold">. . .</span>
          </p>
        )}
        <button
          onClick={toggleShowFullReview}
          className="text-emerald-600 hover:underline mt-1"
        >
          {review === null ||
          review?.length <= REVIEW_LIMIT ? null : showFullReview ? (
            <>
              <span className="text-[13px]">Show Less</span>
              <HiArrowSmallUp className="inline" />
            </>
          ) : (
            <>
              <span className="text-[13px]">Show More</span>
              <HiArrowSmallDown className="inline" />
            </>
          )}
        </button>
        {editModalOpen && (
          <Modal onCloseModal={handleCloseEditModal}>
            <EditReview book={book} onCloseModal={handleCloseEditModal} />
          </Modal>
        )}
      </div>
    </div>
  );
};

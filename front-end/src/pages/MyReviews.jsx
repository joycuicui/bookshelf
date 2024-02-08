import { useSearchParams } from "react-router-dom";
import { HiArrowSmallDown, HiArrowSmallUp } from "react-icons/hi2";

import SortBy from "../components/SortBy";
import StarRating from "../components/StarRating";
import { useReviews } from "../query/useReviews";
import { useState } from "react";

const MyReviews = () => {
  const { isLoading, reviews } = useReviews();
  const [searchParams] = useSearchParams();

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
        <h1 className="text-gray-600 font-semibold text-2xl">My Reviews</h1>
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
      <div className="flex flex-wrap gap-4">{mappedReviews}</div>
    </div>
  );
};

export default MyReviews;

const MyReviewCard = ({ book }) => {
  const {
    book_id: bookId,
    title,
    author,
    cover_image,
    first_published,
    review,
    rating,
  } = book;
  // console.log(review.length);

  const [showFullReview, setShowFullReview] = useState(false);

  const toggleShowFullReview = () => {
    setShowFullReview(!showFullReview);
  };

  return (
    <div className="mx-12 mt-8 p-3 flex flex-col gap-3 border border-gray-300 rounded-lg shadow max-w-[46rem] h-[26rem] overflow-auto">
      <div className="flex justify-between gap-8">
        <img
          src="/default-cover-image.png"
          // src={cover_image}
          alt="Book Cover"
          className="w-28 h-40 rounded-sm"
        />
        <div className="flex flex-col gap-2 flex-grow">
          <p className="text-gray-700 font-semibold text-xl pt-2 truncate">
            {title}
          </p>
          <p className="italic">by {author}</p>
          <div>First Published: {first_published}</div>
          <StarRating ratedRating={rating} />
        </div>
        <div className="flex gap-3 items-start m-3">
          <button className="hover:underline text-emerald-600">EDIT</button>
          <button className="hover:underline text-red-600">DELETE</button>
        </div>
      </div>
      <div className="border-t-[1px] p-3 mb-0 pb-0">
        {showFullReview ? (
          <p>{review}</p>
        ) : (
          <p>
            {review.slice(0, 540)}{" "}
            <span className="text-emerald-700 font-semibold">. . .</span>
          </p>
        )}
        <button
          onClick={toggleShowFullReview}
          className="text-emerald-600 hover:underline mt-2"
        >
          {showFullReview ? (
            <>
              Show Less <HiArrowSmallUp className="inline text-lg" />
            </>
          ) : (
            <>
              Show More <HiArrowSmallDown className="inline text-lg" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

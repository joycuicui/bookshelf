import { useSearchParams } from "react-router-dom";
import SortBy from "../components/SortBy";
import StarRating from "../components/StarRating";

const MyReviews = () => {
  const [searchParams] = useSearchParams();
  // SORTING
  // const sortBy = searchParams.get("sortBy") || "title-asc";
  // const [field, direction] = sortBy.split("-");
  // const modifier = direction === "asc" ? 1 : -1;
  // const sortedBooks = filteredBooks?.slice().sort((a, b) => {
  //   let aValue, bValue;
  //   if (field === "progress") {
  //     // Calculate progress as a percentage
  //     const aProgress = a.current_page / a.total_pages;
  //     const bProgress = b.current_page / b.total_pages;
  //     aValue = aProgress;
  //     bValue = bProgress;
  //   } else {
  //     aValue = a[field];
  //     bValue = b[field];
  //   }
  //   if (aValue < bValue) return -1 * modifier;
  //   if (aValue > bValue) return 1 * modifier;
  //   return 0;
  // });

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
      {/* {sortedBooks?.map((book) => (
      <MyBookItem key={book.id} book={book} />
    ))} */}
      <div className="flex">
        <MyReviewCard
          book={{ book_id: 100, title: "a book title", author: "lulus melons" }}
        />
        <MyReviewCard
          book={{ book_id: 100, title: "a book title", author: "lulus melons" }}
        />
      </div>
    </div>
  );
};

export default MyReviews;

const MyReviewCard = ({ book }) => {
  const { book_id: bookId, title, author } = book;
  const review = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero deleniti iste amet autem voluptas porro tempore harum minima animi. Labore quis perspiciatis iste. Inventore, modi? Temporibus ad esse minima odio! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste libero exercitationem, ullam omnis fugit nihil odit impedit eos dolore deserunt sint sit voluptatem, obcaecati dolores? Dolor dolore deleniti architecto sequi. Lorem, ipsum dolor sit amet consectetur adipisicing elit.Porro, quibusdam culpa id ad nobis magnam consequatur inventore non!`;
  // console.log(review.length);

  return (
    <div className="mx-12 mt-8 p-3 flex flex-col gap-3 border border-gray-300 rounded-lg shadow w-1/2 h-96">
      <div className="flex justify-between gap-8">
        <img
          src="/default-cover-image.png"
          // src={cover_image}
          alt="Book Cover"
          className="w-28 h-40 rounded-sm"
        />
        <div className="flex flex-col gap-2 flex-grow">
          <p className="text-gray-700 font-semibold text-xl pt-2">{title}</p>
          <p className="italic">by {author}</p>
          <div>average rating: 4.5</div>
          <StarRating />
        </div>
        <div className="flex gap-3 items-start m-3">
          <button className="hover:underline text-emerald-600">EDIT</button>
          <button className="hover:underline text-red-600">DELETE</button>
        </div>
      </div>
      <div className="border-t-[1px] p-3">
        <p>{review.slice(0, 540)}</p>
      </div>
    </div>
  );
};

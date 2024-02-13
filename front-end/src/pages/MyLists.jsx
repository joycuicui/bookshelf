import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import Filter from "../components/Filter";
import { useReadingLists } from "../query/useReadingLists";
import { useRemoveFromList } from "../query/useRemoveFromList";
import { useMoveToList } from "../query/useMoveToList";
import SortBy from "../components/SortBy";

const MyLists = () => {
  const { isLoading, readingLists } = useReadingLists();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("list") || "want-to-read";

  // 1. FILTERING
  let filteredLists;
  if (filterValue === "want-to-read") {
    filteredLists = readingLists?.filter((book) => book.reading_list_id === 1);
  }
  if (filterValue === "reading") {
    filteredLists = readingLists?.filter((book) => book.reading_list_id === 2);
  }
  if (filterValue === "read") {
    filteredLists = readingLists?.filter((book) => book.reading_list_id === 3);
  }

  // 2. SORTING
  const sortBy = searchParams.get("sortBy") || "title-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedLists = filteredLists?.slice().sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];
    return (aValue < bValue ? -1 : aValue > bValue ? 1 : 0) * modifier;
  });

  const mappedBooks = sortedLists?.map((book) => (
    <MyBookCard key={book.book_list_id} book={book} />
  ));

  if (isLoading) return <div className="spinner"></div>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-gray-600 font-semibold text-xl">
          My Reading Lists
        </h1>
        <div className="flex gap-2">
          <Filter
            filterField="list"
            options={[
              { value: "want-to-read", label: "Want to Read" },
              { value: "reading", label: "Currently Reading" },
              { value: "read", label: "Read" },
            ]}
          />

          <SortBy
            options={[
              { value: "title-asc", label: "Sort by title (A-Z)" },
              { value: "title-desc", label: "Sort by title (Z-A)" },
              { value: "author-asc", label: "Sort by author (A-Z)" },
              { value: "author-desc", label: "Sort by author (Z-A)" },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-wrap">{mappedBooks}</div>
    </div>
  );
};

export default MyLists;

const MyBookCard = ({ book }) => {
  const { isRemoving, removeBook } = useRemoveFromList();
  const { isMoving, moveToList } = useMoveToList();
  const [showButtons, setShowButtons] = useState(false);
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("list") || "want-to-read";

  let options = [];
  if (filterValue === "want-to-read") {
    options = [
      { value: 0, label: "Move to List" },
      { value: 2, label: "Currently Reading" },
      { value: 3, label: "Read" },
    ];
  }
  if (filterValue === "reading") {
    options = [
      { value: 0, label: "Move to List" },
      { value: 1, label: "Want to Read" },
      { value: 3, label: "Read" },
    ];
  }
  if (filterValue === "read") {
    options = [
      { value: 0, label: "Move to List" },
      { value: 1, label: "Want to Read" },
      { value: 2, label: "Currently Reading" },
    ];
  }

  const {
    book_id: bookId,
    reading_list_id: readingListId,
    title,
    author,
    cover_image,
  } = book;

  const handleMouseEnter = () => {
    setShowButtons(true);
  };
  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  const handleMoveToList = (e) => {
    const selectedListId = parseInt(e.target.value);
    if (selectedListId === 0) return;
    moveToList({ listId: selectedListId, bookId });
  };

  const handleImageError = (e) => {
    e.target.src = "/default-cover-image.png";
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="mx-12 mt-10 pb-2 border border-gray-300 rounded-lg shadow max-w-52"
    >
      <img
        src={cover_image ? cover_image : "/default-cover-image.png"}
        onError={handleImageError}
        alt="Book Cover"
        className="w-56 h-[19rem] rounded-t-lg object-cover"
      />
      <div className="px-2">
        <p className="truncate text-gray-700 font-semibold pt-2 text-sm">
          {title}
        </p>
        {showButtons ? (
          ""
        ) : (
          <p className="italic truncate pt-1 text-xs">by {author}</p>
        )}
      </div>
      <div
        className={`flex justify-between text-xs ${
          showButtons ? "block" : "hidden"
        }`}
      >
        <button
          onClick={() => removeBook({ listId: readingListId, bookId })}
          className="px-2 text-red-600"
        >
          Remove
        </button>
        <select
          onChange={handleMoveToList}
          className="border rounded-md shadow-sm"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

import { useSearchParams } from "react-router-dom";

import MyBookItem from "../components/MyBookItem";
import SortBy from "../components/SortBy";
import { useProgress } from "../query/useProgress";
import { useState } from "react";
import Modal from "../components/Modal";
import AddBook from "../components/AddBook";

const MyProgress = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, progress } = useProgress();
  // console.log("progress", progress);

  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const filteredBooks = progress?.filter((book) => book.list_id === 2);

  if (isLoading) return <div className="spinner"></div>;

  // SORTING
  const sortBy = searchParams.get("sortBy") || "title-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedBooks = filteredBooks?.slice().sort((a, b) => {
    let aValue, bValue;
    if (field === "progress") {
      // Calculate progress as a percentage
      const aProgress = a.current_page / a.total_pages;
      const bProgress = b.current_page / b.total_pages;
      aValue = aProgress;
      bValue = bProgress;
    } else {
      aValue = a[field];
      bValue = b[field];
    }
    if (aValue < bValue) return -1 * modifier;
    if (aValue > bValue) return 1 * modifier;
    return 0;
  });

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-gray-600 font-semibold text-xl">My Progress</h1>
        <div className="flex gap-2">
          <button
            onClick={handleOpenAddModal}
            className="font-semibold text-gray-700  bg-emerald-300 hover:bg-emerald-400 focus:ring-4 focus:outline-none focus:ring-emerald-200 rounded-lg px-5 py-2.5 text-center inline-flex items-center"
          >
            <span className="text-xs mr-2">+</span>
            <span className="text-xs">Add a New Book</span>
          </button>

          <SortBy
            options={[
              { value: "title-asc", label: "Sort by title (A-Z)" },
              { value: "title-desc", label: "Sort by title (Z-A)" },
              { value: "author-asc", label: "Sort by author (A-Z)" },
              { value: "author-desc", label: "Sort by author (Z-A)" },
              {
                value: "progress-asc",
                label: "Sort by progress (lowest first)",
              },
              {
                value: "progress-desc",
                label: "Sort by progress (highest first)",
              },
            ]}
          />
        </div>
      </div>
      {sortedBooks?.map((book) => (
        <MyBookItem key={book.id} book={book} />
      ))}
      {addModalOpen && (
        <Modal onCloseModal={handleCloseAddModal}>
          <AddBook
            onCloseModal={handleCloseAddModal}
            // books={allBooksInLists}
          />
        </Modal>
      )}
    </div>
  );
};

export default MyProgress;

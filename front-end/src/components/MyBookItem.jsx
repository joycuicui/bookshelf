import { useState } from "react";
import { HiMiniCheckCircle, HiChevronDown } from "react-icons/hi2";

import { useUpdateProgress } from "../query/useUpdateProgress";
import { useMoveToList } from "../query/useMoveToList";
import { useSendEmail } from "../query/useSendEmail";

const MyBookItem = ({ book }) => {
  const {
    book_id: bookId,
    current_page: currentPage,
    total_pages: totalPages,
    title,
    author,
    cover_image,
    first_published,
  } = book;

  const { isUpdating, updateProgress } = useUpdateProgress();
  const { isMoving, moveToList } = useMoveToList();
  const { isSending, sendEmail } = useSendEmail();

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState(0);

  const progressPercentage = ((currentPage / totalPages) * 100).toFixed(2);

  let emoji;

  if (progressPercentage == 100) emoji = "🎉";
  if (progressPercentage >= 75 && progressPercentage < 100) emoji = "🥳";
  if (progressPercentage >= 50 && progressPercentage < 75) emoji = "😆";
  if (progressPercentage >= 25 && progressPercentage < 50) emoji = "😉";
  if (progressPercentage >= 0 && progressPercentage < 25) emoji = "🧐";
  if (progressPercentage == 0) emoji = "📖";

  const toggleUpdateProgressFrom = () => {
    setShowUpdateForm((prev) => !prev);
  };

  const handleEmailReminder = () => {
    sendEmail({
      subject: "Your Reading Reminder From BookHaven 🚀",
      text: "This is a email reminder for you to keep reading your book!",
    });
  };

  const handleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleUpdateProgress = (e) => {
    e.preventDefault();
    updateProgress({ bookId, currentPage: inputValue, totalPages });
    setShowUpdateForm(false);
  };

  const handleProgressInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleMoveToWant = () => {
    moveToList({ listId: 1, bookId });
  };
  const handleMoveToRead = () => {
    moveToList({ listId: 3, bookId });
  };

  const handleImageError = (e) => {
    e.target.src = "/default-cover-image.png";
  };

  return (
    <div className="mx-12 my-8 flex gap-16 border border-gray-300 rounded-lg shadow justify-between">
      <img
        src={cover_image ? cover_image : "/default-cover-image.png"}
        onError={handleImageError}
        alt="Book Cover"
        className="w-44 rounded-l-lg"
      />
      <div className="flex flex-col gap-2 pt-2 flex-grow">
        <p className="text-gray-700 font-semibold text-lg pt-2">{title}</p>
        <p className="italic text-sm">by {author}</p>
        <p className="text-sm">
          First Published: {first_published ? first_published : "n/a"}
        </p>
        <div className="mt-1 flex flex-col gap-3 items-start">
          <label className="flex items-center mt-2">
            <progress max="100" value={progressPercentage}></progress>
            <div className="text-base font-semibold block ml-5 text-gray-700">
              <span>{currentPage}/</span>
              <span>{totalPages}</span>
              <span className="ml-3">({progressPercentage}%</span>
              <span className="ml-2">{emoji})</span>
            </div>
          </label>
          <div className="flex gap-3 text-sm">
            <button
              onClick={toggleUpdateProgressFrom}
              className="button-effect tracking-wider mt-2 bg-emerald-700 text-white p-2.5 px-4 rounded-full disabled:opacity-80 disabled:cursor-wait"
            >
              Update Progress
            </button>
            {showUpdateForm && (
              <form
                onSubmit={handleUpdateProgress}
                className="mt-3 px-3 flex gap-2 items-center border-b-2"
              >
                <span>Currently on</span>
                <input
                  onChange={handleProgressInput}
                  type="text"
                  placeholder="page #"
                  className="outline-none bg-gray-50 w-16"
                />
                <span>of {totalPages}</span>
                <button type="submit">
                  <HiMiniCheckCircle className="text-emerald-600 mr-2 text-2xl cursor-pointer" />
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="mt-2 text-sm">
          <button
            onClick={handleEmailReminder}
            className="button-effect tracking-wider bg-amber-700 text-white p-2.5 px-4 rounded-full disabled:opacity-80 disabled:cursor-wait"
          >
            Email Reminder
          </button>
        </div>
      </div>

      <div className="pt-5 mr-5">
        <button
          onClick={handleDropdown}
          type="button"
          className="text-gray bg-emerald-300 hover:bg-emerald-400 focus:ring-4 focus:outline-none focus:ring-emerald-200 font-medium rounded-lg text-xs px-4 py-2 text-center inline-flex items-center"
        >
          Move to list
          <span className="ml-2">
            <HiChevronDown />
          </span>
        </button>
        <div
          id="dropdown"
          className={`${
            showDropdown ? "block" : "hidden"
          } z-10 bg-white rounded-lg shadow`}
        >
          {showDropdown && (
            <ul className="py-2 text-xs text-gray-700">
              <li
                onClick={handleMoveToWant}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Want To Read
              </li>
              <li
                onClick={handleMoveToRead}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Read
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookItem;

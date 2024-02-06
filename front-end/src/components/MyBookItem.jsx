import { useState } from "react";
import { HiMiniCheckCircle, HiChevronDown } from "react-icons/hi2";

const MyBookItem = ({ book }) => {
  const { title, author, cover_image } = book;

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [currentPage, setCurrentPage] = useState(100);
  const [totalPages, setTotalPages] = useState(500);

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

  const handleSetReadingGoal = () => {
    console.log("Setting Reading Goal");
  };

  const handleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleUpdateProgress = (e) => {
    e.preventDefault();
    setShowUpdateForm(false);
  };

  const handleProgressInput = (e) => {
    setCurrentPage(e.target.value);
  };

  return (
    <div className="mx-12 mt-8 flex gap-16 border border-gray-300 rounded-lg shadow justify-between">
      <img
        src={`/${cover_image}`}
        alt="Book Cover"
        className="w-56 rounded-l-lg"
      />
      <div className="flex flex-col gap-2 pt-3 flex-grow">
        <p className="text-gray-700 font-semibold text-xl pt-2">{title}</p>
        <p>by {author}</p>
        <div className="mt-2 flex flex-col gap-3 items-start">
          <label className="flex items-center">
            <progress max="100" value={progressPercentage}></progress>
            <div className="text-xl font-semibold block ml-5 text-gray-700">
              <span>{currentPage}/</span>
              <span>{totalPages}</span>
              <span className="ml-3">({progressPercentage}%</span>
              <span className="ml-2">{emoji})</span>
            </div>
          </label>
          <div className="flex gap-3">
            <button
              onClick={toggleUpdateProgressFrom}
              className="button-effect tracking-wider mt-3 bg-emerald-700 text-white p-3 px-5 rounded-full disabled:opacity-80 disabled:cursor-wait"
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
                <span>of 489</span>
                <button type="submit">
                  <HiMiniCheckCircle className="text-emerald-600 mr-2 text-3xl cursor-pointer" />
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="mt-2">
          <button
            onClick={handleSetReadingGoal}
            className="button-effect tracking-wide mt-2 bg-amber-700 text-white p-3 px-5 rounded-full disabled:opacity-80 disabled:cursor-wait"
          >
            Set Reading Goal
          </button>
        </div>
      </div>

      <div className="pt-5 mr-5">
        <button
          onClick={handleDropdown}
          type="button"
          className="text-gray bg-emerald-300 hover:bg-emerald-400 focus:ring-4 focus:outline-none focus:ring-emerald-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          Move to list
          <span className="ml-2">
            <HiChevronDown className="text-lg" />
          </span>
        </button>
        <div
          id="dropdown"
          className={`${
            showDropdown ? "block" : "hidden"
          } z-10 bg-white rounded-lg shadow`}
        >
          {showDropdown && (
            <ul className="py-2 text-sm text-gray-700">
              <li className="block px-4 py-2 hover:bg-gray-100">
                Want To Read
              </li>
              <li className="block px-4 py-2 hover:bg-gray-100">Finished</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookItem;

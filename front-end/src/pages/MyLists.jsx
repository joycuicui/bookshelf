import { useSearchParams } from "react-router-dom";

import Filter from "../components/Filter";
import { useReadingLists } from "../query/useReadingLists";
import { useRemoveFromList } from "../query/useRemoveFromList";

const MyLists = () => {
  const { isLoading, readingLists } = useReadingLists();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("list") || "want-to-read";
  // console.log(filterValue);

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

  // all books in reading lists for now
  const mappedBooks = filteredLists?.map((book) => (
    <MyBookCard key={book.book_list_id} book={book} />
  ));

  if (isLoading) return <div className="spinner"></div>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-gray-600 font-semibold text-2xl">
          My Reading Lists
        </h1>
        <Filter
          filterField="list"
          options={[
            { value: "want-to-read", label: "Want to Read" },
            { value: "reading", label: "Currently Reading" },
            { value: "read", label: "Read" },
          ]}
        />
      </div>
      <div className="flex flex-wrap">{mappedBooks}</div>
    </div>
  );
};

export default MyLists;

const MyBookCard = ({ book }) => {
  const { isRemoving, removeBook } = useRemoveFromList();
  const {
    book_id: bookId,
    reading_list_id: readingListId,
    title,
    author,
    cover_image,
  } = book;
  // console.log(readingListId, bookId);

  return (
    <div className="mx-12 mt-10 border border-gray-300 rounded-lg shadow max-w-56">
      <img
        src={`/${cover_image}`}
        alt="Book Cover"
        className="w-56 rounded-t-lg"
      />
      <div className="px-2 pb-2">
        <p className="text-gray-700 font-semibold pt-2">{title}</p>
        <p className="italic">by {author}</p>
      </div>
      <button onClick={() => removeBook({ listId: readingListId, bookId })}>
        Remove
      </button>
    </div>
  );
};

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchReadingListStart,
//   fetchReadingListSuccess,
//   fetchReadingListFailure,
// } from "../redux/readingList/readingListSlice";

// const MyLists = () => {
//   // const dispatch = useDispatch();
//   // const { currentUser } = useSelector((state) => state.user);
//   // const { lists, loading, error } = useSelector((state) => state.readingList);

//   // useEffect(() => {
//   //   const fetchReadingLists = async () => {
//   //     dispatch(fetchReadingListStart());
//   //     try {
//   //       const response = await fetch(`/api/readinglists/${currentUser.id}`);
//   //       const data = await response.json();
//   //       console.log(data);
//   //       if (data.success === false) {
//   //         dispatch(fetchReadingListFailure(data.message));
//   //         return;
//   //       }
//   //       dispatch(fetchReadingListSuccess(data));
//   //     } catch (err) {
//   //       dispatch(fetchReadingListFailure(err.message));
//   //     }
//   //   };
//   //   fetchReadingLists();
//   // }, [currentUser.id, dispatch]);

//   // const { currentlyReading, wantToRead, finishedReading } = lists;

//   // const mappedWantToRead = wantToRead.map((book) => (
//   //   <BookCard key={book.id} book={book} />
//   // ));

//   // const mappedCurrentlyReading = currentlyReading.map((book) => (
//   //   <BookCard key={book.id} book={book} />
//   // ));

//   // const mappedRead = finishedReading.map((book) => (
//   //   <BookCard key={book.id} book={book} />
//   // ));

//   return (
//     <div>
//       <h1 className="text-gray-600 font-semibold text-2xl">My Reading Lists</h1>
//       <div className="flex flex-wrap">
//         {/* {wantToRead && mappedWantToRead}
//         {currentlyReading && mappedCurrentlyReading}
//         {finishedReading && mappedRead} */}
//       </div>
//     </div>
//   );
// };

// export default MyLists;

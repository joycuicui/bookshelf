import { useSelector } from "react-redux";

const MyLists = () => {
  const { wantToRead, currentlyReading, finishedReading } = useSelector(
    (state) => state.readingList.lists
  );

  console.log(wantToRead);

  return (
    <div>
      <div>
        Want to Read
        <ul>
          {wantToRead?.map((book) => (
            <li key={book.id}>
              <span className="bg-red-200">{book.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        Currently Reading
        <ul>
          {currentlyReading?.map((book) => (
            <li className="bg-red-200" key={book.id}>
              {book.title}
            </li>
          ))}
        </ul>
      </div>
      <div>
        Finished
        <ul>
          {finishedReading?.map((book) => (
            <li className="bg-red-200" key={book.id}>
              {book.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyLists;

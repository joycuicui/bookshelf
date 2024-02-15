import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAddBookAgain } from "../query/useAddBookToDbAndList";
import { useAddBookInList } from "../query/useAddBookInList"; // Import the useAddBookInList hook
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const Search = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [coverImages, setCoverImages] = useState({});
  const [descriptions, setDescriptions] = useState({});
  const [openItem, setOpenItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchTerm = new URLSearchParams(location.search).get("q");
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const { addBooked, isCreating } = useAddBookAgain();
  const { isAdding, addBookInList } = useAddBookInList(); // Initialize useAddBookInList hook



  const handleAdd = async (item, id) => {

    if (!currentUser) {
      toast.error("You must be logged in to add a book!");
      return navigate("/login");
    }
    const listId = 1;
    const userId = currentUser.id;




    try {
      const bookData = {
        title: item.title,
        author: item.author_name ? item.author_name.join(", ") : "",
        totalPages: item.number_of_pages_median,
        description: descriptions[id] || "",
        publisher: item.publisher ? item.publisher[0] : "",
        publishedYear: item.first_publish_year || "",
        bookCover: coverImages[id] || "",
        cover_image_medium: coverImages[id] || "",
        isbn: item.isbn || "",
        external_id: item.key
      };

      const addedBook = await addBooked(bookData);





      await addBookInList({ bookId, listId, userId });


      toast.success("Book added to reading list!");
    } catch (error) {
      console.error("Error adding book:", error.message);
    }
    return navigate("/user/books");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchTerm) {
          const response = await fetch(
            `https://openlibrary.org/search.json?q=${searchTerm}`
          );
          const result = await response.json();
          setSearchResults(result.docs);

          const newCoverImages = {};
          const newDescriptions = {};
          await Promise.all(
            result.docs.map(async (book) => {
              const id = book.key.replace("/works/", "");
              if (book.cover_i) {
                const coverResponse = await fetch(
                  `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                );

                const coverBlob = await coverResponse.blob();
                newCoverImages[id] = URL.createObjectURL(coverBlob);
              } else {
                newCoverImages[id] = "/default-cover-image.png";
              }
              try {
                const descriptionResponse = await fetch(
                  `https://openlibrary.org/works/${id}.json`
                );
                const descriptionData = await descriptionResponse.json();

                if (
                  descriptionData.description &&
                  typeof descriptionData.description === "string"
                ) {
                  const cleanDescription = descriptionData.description
                    .replace(/source|: https?:\/\/\S+|\(\[\]\[1\]\) \[1\]/g, "")
                    .trim();
                  newDescriptions[id] = cleanDescription;
                }
              } catch (error) {
                console.error("description error:", error);
              }
            })
          );

          setCoverImages(newCoverImages);
          setDescriptions(newDescriptions);
        }
      } catch (error) {
        console.error("search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  const toggleDescription = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  if (isLoading) return <div className="spinner"></div>;

  return (
    <div className="search-container p-4">
      <h1 className="text-green-800 font-semibold text-xl">Search Results</h1>
      <ul>
        {searchResults.map((item, i) => {
          const id = item.key.replace("/works/", "");
          return (
            <div key={i}>
              <li className="mx-12 mt-8 flex gap-16 border border-gray-300 rounded-lg shadow justify-between p-6">
                <div className="w-56">
                  <img
                    src={coverImages[id]}
                    alt="Book Cover"
                    className="w-56 h-auto rounded-l-lg min-w-[100px]"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <strong className="text-gray-700 font-semibold text-xl">
                    {item.title}
                  </strong>
                  <p className="text-gray-600">
                    by: {item.author_name && item.author_name.join(", ")}
                  </p>
                  <p className="text-gray-500 font-semibold">
                    Year Published: {item.first_publish_year}
                  </p>
                  <p className="text-gray-500 font-semibold">
                    Page count: {item.number_of_pages_median}
                  </p>
                  {openItem === id && descriptions[id] && (
                    <p className="text-sm text-gray-500 ">{descriptions[id]}</p>
                  )}
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => toggleDescription(id)}
                      className="focus:outline-none text-white bg-green-400 hover:bg-green-800  focus:ring-green-300 focus:bg-green-300 active:bg-green-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-200 dark:hover:bg-green-700 dark:focus:ring-green-00"
                    >
                      {openItem === id
                        ? "Hide Description"
                        : "Show Description"}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col justify-center bottom-4 right-4">
                  <button
                    onClick={() => handleAdd(item, id)}
                    disabled={isAdding}
                    type="button"
                    className="focus:outline-none text-white bg-green-400 hover:bg-green-800 focus:ring-green-300 focus:bg-green-800 active:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-200 dark:hover:bg-green-700 dark:focus:ring-green-00"
                  >
                    {isCreating ? "Adding..." : "Add book"}
                  </button>

                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Search;

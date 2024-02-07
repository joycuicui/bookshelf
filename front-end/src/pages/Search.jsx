import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HiMiniCheckCircle, HiChevronDown } from "react-icons/hi2";


const Search = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchTerm = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchTerm) {
          const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`);
          const result = await response.json();
          setData(result.docs);
          setSearchResults(result.docs);
        }
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="search-container p-4 ">
      <h1 className="text-green-800 font-semibold text-xl" >Search Results</h1>
      <ul>
        {searchResults.map((item, i) => (
          <div key={i}>
            <li className="mx-12 mt-8 flex gap-16 border border-gray-300 rounded-lg shadow justify-between p-6">
            <div className="w-56">
              <img
                src={"/default-cover-image.png"}
                alt="Book Cover"
                className="w-56 rounded-l-lg"
              />
            </div>
              <div className="flex flex-col justify-center">
                <strong className="text-gray-700 font-semibold text-xl">{item.title}</strong>
                <p className="text-gray-600">by: {item.author_name && item.author_name.join(', ')}</p>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-gray-500 font-semibold text top-2 right-2">Year Published: {item.first_publish_year}</p>
                <p className="text-gray-500 font-semibold text top-2 right-2">Page count: {item.number_of_pages_median}</p>
              </div>
              <div className=" flex flex-col justify-center bottom-4 right-4">
                <button type="button" class="focus:outline-none text-white bg-green-400 hover:bg-green-800  focus:ring-green-300 focus:bg-green-800 active:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-200 dark:hover:bg-green-700 dark:focus:ring-green-00">Add book</button>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>

  );
};

export default Search;


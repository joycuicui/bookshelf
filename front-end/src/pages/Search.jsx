import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
    <div className="search-container p-4">
      <ul>
        {searchResults.map((item, i) => (
          <li key={i} className="border-2 border-green-500 p-4 mb-4 ">
            <strong>Title:</strong> {item.title}<br />
            <strong>Author:</strong> {item.author_name && item.author_name.join(', ')}<br />
            <strong>First Publish Year:</strong> {item.first_publish_year}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;


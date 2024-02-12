import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";



const Search = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [coverImages, setCoverImages] = useState({});
  const [descriptions, setDescriptions] = useState({});
  const searchTerm = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchTerm) {
          const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`);
          const result = await response.json();
          setSearchResults(result.docs);
    
          const newCoverImages = {};
          const newDescriptions = {};
          await Promise.all(result.docs.map(async (book) => {
            const id = book.key.replace("/works/", "");
            if (book.cover_i) {
              const coverResponse = await fetch(`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`);
              const coverBlob = await coverResponse.blob();
              newCoverImages[id] = URL.createObjectURL(coverBlob);
            } else {
              newCoverImages[id] = "/default-cover-image.png";
            }
            try {
            const descriptionResponse = await fetch(`https://openlibrary.org/works/${id}.json`);
            console.log('endpoint request', `https://openlibrary.org/works/${id}.json`)
            console.log('descriptionResponse', descriptionResponse)
            const descriptionData = await descriptionResponse.json();
            console.log('descriptionData', descriptionData)
            newDescriptions[id] = descriptionData.description;
            console.log('newDescriptions', newDescriptions)

            } catch (error) {
            console.error("description error:", error)
            }
          }));
    
          setCoverImages(newCoverImages);
          setDescriptions(newDescriptions);
        }
      } catch (error) {
        console.error("search error:", error);
      }
    };
    
    fetchData();
  }, [searchTerm]);

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
                    className="w-56 rounded-l-lg"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <strong className="text-gray-700 font-semibold text-xl">{item.title}</strong>
                  <p className="text-gray-600">by: {item.author_name && item.author_name.join(', ')}</p>
                  <p className="text-gray-500 font-semibold">Year Published: {item.first_publish_year}</p>
                  <p className="text-gray-500 font-semibold">Page count: {item.number_of_pages_median}</p>
                  <p className="text-gray-500">{typeof descriptions[id] === 'object' && descriptions[id].value}</p>
                </div>
                <div className="flex flex-col justify-center bottom-4 right-4">
                  <button type="button" className="focus:outline-none text-white bg-green-400 hover:bg-green-800  focus:ring-green-300 focus:bg-green-800 active:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-200 dark:hover:bg-green-700 dark:focus:ring-green-00">Add book</button>
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
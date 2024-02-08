import React, { useState, useEffect } from 'react';
const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books/all'); // Assuming '/api/books' is your endpoint to fetch all books
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
        setLoading(false);
        console.log("home data: ",data);
      } catch (error) {
        console.error("home : ",error);

        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div>
      <h1 className="text-green-800 font-semibold text-xl p-8">Choose Your Next Adventure!</h1>
      <div>
       <ul className="flex flex-wrap justify-center space-x-15">
        {books.map((book) => (
          <div className="mx-12 mt-10 border border-gray-300 rounded-lg shadow max-w-56" key={book.id}>
            <div className="relative overflow-hidden rounded-lg h-80">
            <img src={book.cover_image_medium} alt="Book Cover" className="absolute inset-0 w-full h-full object-cover rounded-lg"/>
            </div>
            <div className="flex flex-col justify-center items-center px-5 py-4">
              <p className="text-gray-700 font-semibold pt-2">{book.title}</p>
              <p className="italic text-gray-500 text-xs">by {book.name} </p>

            <button className = "mt-2 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-300" >
              View Book Details
            </button>
            </div>
          </div>
          ))}
        </ul>
      </div>
    </div>

  );
};
export default Home;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookDetailsPage = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`/api/books/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        setBook(data[0]);
        console.log("Book State: ",book);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row">
    <div className="w-1/3">
      <div className="relative overflow-hidden rounded-lg h-80">
        <img src={book.cover_image_medium} alt="Book Cover" className=" absolute inset-0 w-full h-full object-scale-down rounded-lg scale-100" />
      </div>
    </div>
    <div className="w-2/3 p-9">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p className="text-gray-700">{book.description}</p>
      <div className="flex flex-col mt-4">
        <p><span className="font-bold">Author:</span> {book.author_names}</p>
        <p><span className="font-bold">Publisher:</span> {book.publisher}</p>
        <p><span className="font-bold">Published Year:</span> {book.published_year}</p>
        <p><span className="font-bold">ISBN:</span> {book.isbn}</p>
        <p><span className="font-bold">Author Names:</span> {book.author_names}</p>
        <p><span className="font-bold">Genre Names:</span> {book.genre_names}</p>
        <p><span className="font-bold">In Book List:</span> {book.in_book_list}</p>
      </div>
    </div>
  </div>
  );
};

export default BookDetailsPage;
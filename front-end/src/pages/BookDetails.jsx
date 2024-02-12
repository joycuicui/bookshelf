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
    <div>
      <h1>Book Details</h1>
      <div className="relative overflow-hidden rounded-lg h-80">
            <img src={book.cover_image_medium} alt="Book Cover" className="absolute inset-0 w-full h-full object-cover rounded-lg"/>
            </div>
      <p>ID: {book.id}</p>
      <p>Title: {book.title}</p>
      <p>Description: {book.description}</p>
      <p>Author: {book.author}</p>
      <p>Publisher: {book.publisher}</p>
      <p>published_year: {book.published_year}</p>
      <p>isbn: {book.isbn}</p>
      <p>author_names: {book.author_names}</p>
      <p>genre_names: {book.genre_names}</p>
      <p>In book list:</p>
      
    </div>
  );
};

export default BookDetailsPage;
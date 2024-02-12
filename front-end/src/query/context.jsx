
// import React, {useState, useContext, useEffect} from 'react';
// import { useCallback } from 'react';
// const URL = "http://openlibrary.org/search.json?title=";
// const AppContext = React.createContext();

// const AppProvider = ({children}) => {
//     const [searchTerm, setSearchTerm] = useState("the lost world");
//     const [books, setBooks] = useState([]);
//     const [resultTitle, setResultTitle] = useState("");

//     const fetchBooks = useCallback(async() => {
//         try{
//             const response = await fetch(`${URL}${searchTerm}`);
//             const data = await response.json();
//             const {docs} = data;

//             if(docs){
//                 const newBooks = docs.slice(0, 20).map((bookSingle) => {
//                     const {key, author_name, cover_i, edition_count, first_publish_year, title} = bookSingle;

//                     return {
//                         id: key,
//                         author: author_name,
//                         cover_id: cover_i,
//                         edition_count: edition_count,
//                         first_publish_year: first_publish_year,
//                         title: title
//                     }
//                 });

//                 setBooks(newBooks);

//                 if(newBooks.length > 1){
//                     setResultTitle("Search Result");
//                 } else {
//                     setResultTitle("No Search Result Found!")
//                 }
//             } else {
//                 setBooks([]);
//                 setResultTitle("No Search Result Found!");
//             }
//         } catch(error){
//             console.log(error);
//         }
//     }, [searchTerm]);

//     useEffect(() => {
//         fetchBooks();
//     }, [searchTerm, fetchBooks]);

//     return (
      
//         <AppContext.Provider value = {{
//              books, setSearchTerm, resultTitle, setResultTitle,
//         }}>
//             {children}
//         </AppContext.Provider>
//     )
// }

// export const useGlobalContext = () => {
//     return useContext(AppContext);
// }

// export {AppContext, AppProvider};
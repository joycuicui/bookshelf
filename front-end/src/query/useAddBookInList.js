import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const addBookInList = async (bookId,listId,userId) => {
  
  console.log ("useAddBookinList received bookId value from book details --->", bookId);
  console.log ("useAddBookinList received listId value from book details --->", listId);
  console.log ("useAddBookinList received userID value from book details --->", userId);

  if (!listId || !bookId) {
    throw new Error("Invalid user ID or book ID");
  }

  try{
    const response = await fetch(`/api/readinglists/${listId}/${bookId}`,{
      method : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "listId": listId, "bookId": bookId, "userId": userId }),
    });

    const data = await response.json();
    
    if (data.success === false) {
      throw new Error(data.message);
    }
    return data;

  } catch (err) {
    throw new Error(err.message);
  }
};

export const useAddBookInList = () => {
  const queryClient = useQueryClient();

  const {isLoading: isAdding, mutate: addBook} = useMutation({
    mutationFn : ({bookId, listId, userId}) => addBookInList(bookId, listId, userId),
    onSuccess : () => {
      toast.success("Book added into reading list!");
      queryClient.invalidateQueries({ queryKey: ["readingLists"] });
    },
    onError : (err) => toast.error(err.message),
    mutationkey :"addBookInList",
  });
  return {isAdding,addBook}
};

//const removeFromList = async (listId, bookId) => {
//  if (!listId || !bookId) {
//    throw new Error("Invalid list or book ID");
//  }
//  try {
//    const response = await fetch(`/api/readinglists/${listId}/${bookId}`, {
//      method: "DELETE",
//    });
//    const data = await response.json();
//    if (data.success === false) {
//      throw new Error(data.message);
//    }
//    return data;
//  } catch (err) {
//    throw new Error(err.message);
//  }
//};

//export const useRemoveFromList = () => {
//  const queryClient = useQueryClient();
//
//  const { isLoading: isRemoving, mutate: removeBook } = useMutation({
//    mutationFn: ({ listId, bookId }) => removeFromList(listId, bookId),
//    onSuccess: () => {
//      toast.success("Book removed from list!");
//      queryClient.invalidateQueries({ queryKey: ["readingLists"] });
//    },
//    onError: (err) => toast.error(err.message),
//    mutationKey: "removeFromList",
//  });
//  return { isRemoving, removeBook };
//};

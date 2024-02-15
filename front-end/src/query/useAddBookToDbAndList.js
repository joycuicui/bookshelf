import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { store } from "../redux/store";

const addBookApiAgain = async (
  title,
  author,
  totalPages,
  description,
  publisher,
  publishedYear,
  bookCover,

) => {
  const { currentUser } = store.getState().user;

  if (!title || !author || !totalPages) {
    throw new Error("Missing information for new book");
  }
  try {
    const response = await fetch(`/api/books/${currentUser.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        totalPages,
        description,
        publisher,
        publishedYear,
        bookCover

      }),
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

export const useAddBookAgain = () => {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutateAsync: addBooked } = useMutation({
    mutationFn: ({
      title,
      author,
      totalPages,
      description,
      publisher,
      publishedYear,
      bookCover
      



    }) =>

      addBookApiAgain(
        title,
        author,
        totalPages,
        description,
        publisher,
        publishedYear,
        bookCover

      ),

    onSuccess: (data) => {
      toast.success("Successfully added book!");
      queryClient.invalidateQueries({ queryKey: ["readingLists"] });
      return data;
    },
    onError: (err) => toast.error(err.message),
    mutationKey: "addBookApiAgain",
  });
  return { isCreating, addBooked };
};



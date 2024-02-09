import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { store } from "../redux/store";

const addReviewApi = async (bookAuthorId, rating, review) => {
  const { currentUser } = store.getState().user;

  if (!bookAuthorId) {
    throw new Error("Invalid book author ID");
  }
  try {
    const response = await fetch(`/api/reviews/${currentUser.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookAuthorId, rating, review }),
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

export const useAddReview = () => {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addReview } = useMutation({
    mutationFn: ({ bookAuthorId, rating, review }) =>
      addReviewApi(bookAuthorId, rating, review),
    onSuccess: () => {
      toast.success("Successfully added review");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (err) => toast.error(err.message),
    mutationKey: "addReview",
  });
  return { isAdding, addReview };
};

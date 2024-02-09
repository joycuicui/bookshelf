import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const deleteReviewApi = async (reviewId) => {
  if (!reviewId) {
    throw new Error("Invalid review ID");
  }
  try {
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
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

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteReview } = useMutation({
    mutationFn: ({ reviewId }) => deleteReviewApi(reviewId),
    onSuccess: () => {
      toast.success("Review deleted!");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (err) => toast.error(err.message),
    mutationKey: "deleteReview",
  });
  return { isDeleting, deleteReview };
};

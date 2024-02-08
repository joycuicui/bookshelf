import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const updateReviewApi = async (reviewId, review) => {
  if (!reviewId) {
    throw new Error("Invalid review ID");
  }
  try {
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review }),
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

export const useEditReview = () => {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editReview } = useMutation({
    mutationFn: ({ reviewId, review }) => updateReviewApi(reviewId, review),
    onSuccess: () => {
      toast.success("Review updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (err) => toast.error(err.message),
    mutationKey: "editReview",
  });
  return { isEditing, editReview };
};

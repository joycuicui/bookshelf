import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const updateProgressApi = async (bookId, currentPage) => {
  if (!bookId) {
    throw new Error("Invalid book ID");
  }
  try {
    const response = await fetch(`/api/progress/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPage }),
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

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateProgress } = useMutation({
    mutationFn: ({ bookId, currentPage }) =>
      updateProgressApi(bookId, currentPage),
    onSuccess: () => {
      toast.success("Update successful! Keep reading!");
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
    onError: (err) => toast.error(err.message),
    mutationKey: "updateProgress",
  });
  return { isUpdating, updateProgress };
};

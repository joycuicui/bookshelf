import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const removeFromList = async (listId, bookId) => {
  if (!listId || !bookId) {
    throw new Error("Invalid list or book ID");
  }
  try {
    const response = await fetch(`/api/readinglists/${listId}/${bookId}`, {
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

export const useRemoveFromList = () => {
  const queryClient = useQueryClient();

  const { isLoading: isRemoving, mutate: removeBook } = useMutation({
    mutationFn: ({ listId, bookId }) => removeFromList(listId, bookId),
    onSuccess: () => {
      toast.success("Book removed from list!");
      queryClient.invalidateQueries({ queryKey: ["readingLists"] });
    },
    onError: (err) => toast.error(err.message),
    mutationKey: "removeFromList",
  });
  return { isRemoving, removeBook };
};

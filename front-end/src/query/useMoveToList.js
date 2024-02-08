import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { store } from "../redux/store";

const moveToListApi = async (listId, bookId) => {
  const { currentUser } = store.getState().user;
  try {
    const response = await fetch(`/api/readinglists/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listId, bookId }),
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

export const useMoveToList = () => {
  const queryClient = useQueryClient();

  const { isLoading: isMoving, mutate: moveToList } = useMutation({
    mutationFn: ({ listId, bookId }) => moveToListApi(listId, bookId),
    onSuccess: () => {
      toast.success("Book moved to another list");
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
    onError: (err) => toast.error(err.message),
    mutationKey: "moveToList",
  });
  return { isMoving, moveToList };
};

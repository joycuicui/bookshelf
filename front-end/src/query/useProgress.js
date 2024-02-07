import { useQuery } from "@tanstack/react-query";
import { store } from "../redux/store";

const fetchProgress = async () => {
  const { currentUser } = store.getState().user;

  try {
    const response = await fetch(`/api/progress/${currentUser.id}`);
    const data = await response.json();
    console.log(data);
    if (data.success === false) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useProgress = () => {
  const {
    isLoading,
    data: progress,
    error,
  } = useQuery({ queryKey: ["progress"], queryFn: fetchProgress });
  return { isLoading, progress, error };
};

import { useQuery } from "@tanstack/react-query";
import { store } from "../redux/store";

const fetchReadingLists = async () => {
  const { currentUser } = store.getState().user;

  try {
    const response = await fetch(`/api/readinglists/${currentUser.id}`);
    const data = await response.json();
    // console.log(data);
    if (data.success === false) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useReadingLists = () => {
  const {
    isLoading,
    data: readingLists,
    error,
  } = useQuery({ queryKey: ["readingLists"], queryFn: fetchReadingLists });
  return { isLoading, readingLists, error };
};

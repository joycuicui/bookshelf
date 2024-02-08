import { useQuery } from "@tanstack/react-query";
import { store } from "../redux/store";

const fetchReviews = async () => {
  const { currentUser } = store.getState().user;

  try {
    const response = await fetch(`/api/reviews/${currentUser.id}`);
    const data = await response.json();
    // console.log("reviews: ", data);
    if (data.success === false) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useReviews = () => {
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({ queryKey: ["reviews"], queryFn: fetchReviews });
  return { isLoading, reviews, error };
};

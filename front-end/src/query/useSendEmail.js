import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { store } from "../redux/store";

const sendEmailApi = async (title, percentage) => {
  const { currentUser } = store.getState().user;

  if (!title || !percentage) {
    throw new Error("Subject and text are required");
  }
  try {
    const response = await fetch(`/api/emails/${currentUser.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, percentage }),
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

export const useSendEmail = () => {
  const queryClient = useQueryClient();

  const { isLoading: isSending, mutate: sendEmail } = useMutation({
    mutationFn: ({ title, percentage }) => sendEmailApi(title, percentage),
    onSuccess: () => {
      toast.success("Email successfully sent!");
      queryClient.invalidateQueries({ queryKey: ["emails"] });
    },
    onError: (err) => toast.error(err.message),
    mutationKey: "sendEmail",
  });
  return { isSending, sendEmail };
};

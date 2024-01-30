import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useConversation = () => {
  const axiosPublic = useAxios();
  const { user, receiverEmail } = useAuth();
  function getConversationId(senderEmail, receiverEmail) {
    return `${senderEmail}-${receiverEmail}`;
  }
  const {
    data: conversations,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/get-messages?id=${getConversationId(user?.email, receiverEmail)}`
      );
      return res.data;
    },
  });
  return [conversations, refetch, isLoading];
};

export default useConversation;

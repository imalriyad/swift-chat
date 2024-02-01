import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";



const useConversation = () => {
  const axiosPublic = useAxios();
  const { user, receiverEmail } = useAuth();

  const createConversationId = (user1, user2) => {
    const sortedEmails = [user1, user2].sort();
    return sortedEmails.join("-");
  };
  const { data: conversations, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/get-messages?id=${createConversationId(user?.email, receiverEmail)}`
      );
      return res.data[0]?.messages || [];
    },
  });



  return [conversations, isLoading];
};

export default useConversation;

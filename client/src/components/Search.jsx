import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { mutateFn } from "../lib/fetcher";

const Search = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (prompt) => {
      return await mutateFn("chats/new", prompt);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      navigate(`/dashboard/chats/${data._id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = e.target.prompt.value;
    if (!prompt) return;

    mutate({ prompt });
  };

  return (
    <div className="mt-auto w-[50%] flex">
      <form
        className="w-full h-full bg-[#2C2937] rounded-3xl flex items-center justify-between gap-5"
        onSubmit={handleSubmit}
      >
        <input
          className="text-sm flex-1 p-5 bg-transparent border-none outline-none text-[#ececec]"
          type="text"
          name="prompt"
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className="bg-[#605e68] rounded-full p-3 flex items-center justify-center mr-5"
        >
          <img className="size-4" src="/arrow.png" alt="" />
        </button>
      </form>
    </div>
  );
};

export default Search;

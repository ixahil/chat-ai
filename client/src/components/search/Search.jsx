import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import "./search.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (prompt) => {
      return fetch(`${import.meta.env.VITE_BACKEND_URL}chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }).then((response) => response.json());
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = e.target.prompt.value;
    if (!prompt) return;

    mutation.mutate(prompt);
  };

  return (
    <div className="searchContainer">
      <form onSubmit={handleSubmit}>
        <input type="text" name="prompt" placeholder="Ask me anything..." />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </div>
  );
};

export default Search;

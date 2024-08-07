import "./newPrompt.css";
import { useEffect, useRef, useState } from "react";
import Upload from "./Upload";
import { IKImage } from "imagekitio-react";
import { Loader } from "lucide-react";
import model from "../lib/gemini";
import MarkDown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutateFn } from "../lib/fetcher";
import CustomMarkdown from "./CustomMarkdown";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [image, setImage] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });
  const endRef = useRef();
  const formRef = useRef();

  const queryClient = useQueryClient();

  const chat = model.startChat({
    history: data?.history.map(({ role, parts }) => ({
      role,
      parts: [{ text: parts[0].text }],
    })),
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, answer, question, image.dbData]);

  const mutation = useMutation({
    mutationFn: async () => {
      const body = {
        question: question.length ? question : undefined,
        answer: answer,
        image: image.dbData.filePath || undefined,
      };
      await mutateFn(`chats/${data._id}`, body, "PUT");
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
          setImage({ isLoading: false, error: "", dbData: {}, aiData: {} });
        });
    },
    onError: (error) => {
      console.error("Error while creating chat:", error);
      setImage({
        isLoading: false,
        error: error.message,
        dbData: {},
        aiData: {},
      });
    },
  });

  async function runGemini(prompt, isInitial) {
    !isInitial && setQuestion(prompt);

    try {
      const result = await chat.sendMessageStream(
        Object.entries(image.aiData).length ? [image.aiData, prompt] : [prompt]
      );

      let accumulatedText = "";

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }

      mutation.mutate();
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = e.target.prompt.value;
    if (!prompt) return;
    runGemini(prompt, false);
  };

  // in production we don't need it
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        runGemini(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, []);

  return (
    <>
      {image.isLoading && (
        <div className="flex items-center justify-center">
          <Loader className="animate-spin" />
        </div>
      )}
      {image.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
          path={image.dbData?.filePath}
          width={380}
          transformation={[{ width: 380 }]}
        />
      )}
      {question && <div className="message user">{question}</div>}
      {mutation.isPending ? (
        <Loader className="animate-spin" />
      ) : (
        answer && (
          <div className="message" suppressHydrationWarning={true}>
            <CustomMarkdown>{answer}</CustomMarkdown>
          </div>
        )
      )}
      <div className="endChat" ref={endRef}></div>
      <div className="newPrompt">
        <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
          <Upload setImage={setImage} />
          <input type="file" id="file" multiple={false} hidden />
          <input type="text" name="prompt" placeholder="Ask me Anything..." />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </>
  );
};

export default NewPrompt;

import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import { Loader } from "lucide-react";
import model from "../../lib/gemini";
import MarkDown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    history: data?.history.map(({ role, parts }) => ({ role, parts })),
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, answer, question, image.dbData]);

  const mutation = useMutation({
    mutationFn: async () => {
      return fetch(`${import.meta.env.VITE_BACKEND_URL}chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer: answer,
          image: image.dbData.filePath || undefined,
        }),
      }).then((response) => response.json());
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
        <div>
          <Loader />
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
      {answer && (
        <div className="message">
          <MarkDown>{answer}</MarkDown>
        </div>
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

import "./chatPage.css";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetcher } from "../lib/fetcher";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Markdown from "react-markdown";
import { CustomMarkdown, NewPrompt } from "../components";

const ChatPage = () => {
  const params = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["chat", params.id],
    queryFn: async ({ signal }) => await fetcher(`chats/${params.id}`, signal),
  });

  return (
    <section className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader className="animate-spin" size={32} />
            </div>
          ) : error ? (
            <span>"Something went wrong!"</span>
          ) : (
            data?.history.map((v, k) => (
              <React.Fragment key={v._id}>
                {v.image && (
                  <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
                    path={v.image}
                    height={300}
                    width={400}
                    transformation={[{ height: 300, width: 400 }]}
                    loading="lazy"
                    lqip={{ active: true, quality: 20 }}
                  />
                )}
                <div
                  suppressHydrationWarning={true}
                  className={`message ${v.role === "user" && "user"}`}
                  key={v._id}
                >
                  <CustomMarkdown>{v.parts[0].text}</CustomMarkdown>
                </div>
              </React.Fragment>
            ))
          )}
          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </section>
  );
};

export default ChatPage;

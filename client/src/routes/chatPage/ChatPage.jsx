import React, { useEffect, useRef } from "react";
import "./chatPage.css";
import { NewPrompt } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { Loader } from "lucide-react";
import { IKImage } from "imagekitio-react";
import { fetcher } from "../../lib/fetcher";

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
            <Loader />
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
                  className={`message ${v.role === "user" && "user"}`}
                  key={v._id}
                >
                  <Markdown>{v.parts[0].text}</Markdown>
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

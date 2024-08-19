import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages.js";
import MessageSkeleton from "../skeletons/messageSkeleton.jsx";
import Message from "./Message.jsx";
import useListenMessages from "../../hooks/useListenMessages.js";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef();
  useListenMessages();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    },100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* <Message /> */}
      {loading && [...Array(3)].map((_, i) => <MessageSkeleton key={i} />)}
      {!loading && !messages.length && (
        <p className="text-center">Send a message to start the conversaton</p>
      )}
      {!loading && messages.length ? (
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
export default Messages;

import { useEffect } from "react";
import useConversation from "../../zustand_store/useConversation";
import { useSocketContext } from "../context/SocketContext";
import notificationSound from "../assets/sounds/notification.mp3";
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      setMessages([...messages, newMessage]);
      const audio = new Audio(notificationSound);
      audio.play();
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};
export default useListenMessages;

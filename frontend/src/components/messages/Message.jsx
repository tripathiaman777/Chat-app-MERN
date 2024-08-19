import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime.js";
import useConversation from "../../../zustand_store/useConversation.js";

const Message = ({ message }) => {
  // console.log(message);

  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  // const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${fromMe ? "chat-end" : "chat-start"}`}>
      <div className="flex gap-2 items-end`">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full bg-blue-400">
            <img
              alt="Tailwind CSS chat bubble component"
              src={fromMe ? authUser.profilePic : selectedConversation.profilePic}
            />
          </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
          {message && message.message}
        </div>
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;

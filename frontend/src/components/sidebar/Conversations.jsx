import useGetConversation from "../../hooks/useGetConversations.js";
import { getRandomEmoji } from "../../utils/emojis.js";
import Conversation from "./Conversation.jsx";

const Conversations = () => {
  const { loading, conversations } = useGetConversation();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          conversation={conversation}
          key={conversation._id}
          emoji={getRandomEmoji()}
          lastIds={idx === conversations.length - 1}
        />
      ))}
      {/* <Conversation />
			<Conversation />
			<Conversation />
			<Conversation />
			<Conversation />
			<Conversation /> */}
    </div>
  );
};
export default Conversations;

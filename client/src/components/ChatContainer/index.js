import ChatDisplayMessage from "../ChatMessageDisplay";
import "./index.css";
import sendIcon from "../../Static/icons/send.png" 

const ChatContainer = ({ chatMessages, sendChatMessage, currentUserId }) => {
  return (
    <>
      <div className="overflow-y-auto chat-display-message flex flex-col p-4 pr-bg ">
        {chatMessages.map((message, id) => {
          return (
            <ChatDisplayMessage
              key={id}
              message={message.message}
              left={message.user === currentUserId}
            />
          );
        })}
      </div>
      <div class='mt-2'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendChatMessage(e);
          }}
          className="flex items-center"
        >
          <input
            type="text"
            className="border rounded-xl flex-grow h-10  p-2 focus:outline-none focus:ring  mx-2 "
            name="message"
            placeholder="Please enter your message"
          />
          <button className=" hover:bg-gray-700 hover:text-white mr-2">
            <img src={sendIcon} alt='send' class='h-10' ></img>
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatContainer;

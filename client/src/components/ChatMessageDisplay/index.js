const ChatDisplayMessage = ({ message, left }) => {
  return (
    <div > 
      <div
        className={`shadow-sm overflow-ellipsis  w-max  max-w-md border p-2 px-4  mb-4 h-auto border rounded-2xl right-1 ${left?"float-right pr-red-bg text-white":"bg-white"}`}
      >
        <p className="break-words">{message}</p>
      </div>
    </div>
  );
};

export default ChatDisplayMessage;

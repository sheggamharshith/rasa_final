import defaultAvatar from "../../Static/icons/default.png";
const ChatUser = ({ setChat, chatUser, currentUserId }) => {

  let user = null;
  if (currentUserId === chatUser.from_user.id) {
    user = chatUser.to_user;
  } else {
    user = chatUser.from_user;
  }

  if (!user.image) {
    user.image = defaultAvatar;
  }
  return (
    <div
      className="w-full  "
      onClick={() => {
        setChat(user);
      }}
    >
      <div className="w-full border hover:bg-gray-50 mb-3 hover:shadow-xl flex  items-center bg-white p-4 rounded-xl cursor-pointer transition ease-in duration-500">
        <div className="">
          <img
            className="w-12 h-12 rounded-full "
            src={user.image}
            alt=""
            width="100"
            height="100"
          />
        </div>
        <div className="flex flex-col ml-5">
          <p className="bold text-md">{user.name}</p>
          <p className="bold text-sm">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatUser;

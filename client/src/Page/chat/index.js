import axios from "axios";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import DashBoardTemplate from "../../components/Layout";
import { useUserState } from "../../context/userContext";
import ChatUser from "../../components/ChatUser";
import "./index.css";
import ChatContainer from "../../components/ChatContainer";

const socket = io("http://localhost:8080", { transports: ["websocket"] });

const Chat = () => {
  const current_user = useUserState();
  const [chatUsers, setChatUsers] = useState([]);
  const [roomId, setRoomId] = useState();
  const [toUser, setToUser] = useState();
  const [initialChatMessages, setInitialChatMessages] = useState([]);

  // socket connection
  useEffect(() => {
    socket.on("connect", () => {
      // on new message
      socket.on("new message", (data) => {
        console.log(data);
      });

      // on room id
      socket.on("room_id", (data) => {
        setRoomId(data.id);
        socket.emit("get_room_messages", { id: data.id });
      });

      // chat messages
      socket.on("new_chat_message", (data) => {
        console.log(data);
        setInitialChatMessages((messages) => [...messages, data.messages]);
      });

      // initial chat messages
      socket.on("initial_chat_messages", (data) => {
        console.log(data);
        setInitialChatMessages(data.messages);
      });
    });
  }, []);

  // helps in getting room
  const getRoom = (toUser) => {
    socket.emit("get_room_details", { users: [current_user.id, toUser] });
  };


  // set to user
  const setChat = (toUser) => {
    setToUser(toUser);
    getRoom(toUser.id);
  };

  // send chat message
  const sendChatMessage = (e) => {
    const output_data = {
      user: current_user.id,
      message: e.target.message.value,
      room: roomId,
    };
    socket.emit("create_chat_message", output_data);
    e.target.message.value = null;
  };

  // to get connected friends
  useEffect(() => {
    axios
      .get("friends/connected/" + current_user.id)
      .then((res) => {
        setChatUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [current_user]);

  return (
    <DashBoardTemplate>
      <div className=" max-w-7xl mx-auto bg-white chat-outer-wrapper  shadow-xl">
        <div className="grid grid-cols-12  h-full">
          <div className="hidden md:inline md:col-span-4 p-2 border overflow-y-scroll">
            <div className="chat-inbox mb-3 ml-2 mt-3">
              <p className="text-xl pr-red-cg "> Chat Inbox</p>
            </div>
            <hr className="mb-4" />
            {chatUsers.map((chatUser, key) => (
              <ChatUser
                chatUser={chatUser}
                key={key}
                setChat={setChat}
                currentUserId={current_user.id}
              />
            ))}
          </div>
          {/* to chat container */}
          {toUser ? (
            <div className="col-span-12 md:col-span-8  overflow-y-scroll  pr-bg w-full">
              <div className="flex items-center space-x-4 chat-inbox mb-3  p-3 bg-white ">
                <img
                  className="w-10 h-10 rounded-full "
                  src={toUser.image}
                  alt=""
                  width="100"
                  height="100"
                />
                <p className="text-xl pr-red-cg "> {toUser.name}</p>
                
              </div>
              
              <ChatContainer
                chatMessages={initialChatMessages}
                sendChatMessage={sendChatMessage}
                currentUserId={current_user.id}
              />
            </div>
          ) : null}
        </div>
      </div>
    </DashBoardTemplate>
  );
};

export default Chat;

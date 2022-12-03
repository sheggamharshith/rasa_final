const {
  getRoomByUsers,
  createRoom,
  getChatMessage,
  createChatMessage,
} = require("./services/chatRoom.service");

module.exports = (io) => {
  io.sockets.on("connection", (socket) => {
    socket.on("get_room_details", (user_data) => {
      getRoomByUsers(user_data)
        .then((result) => {
          if (result === null) {
            createRoom(user_data).then((data) => {
              room = data.id;
              socket.emit("room_id", data);
              socket.join(`room-${data.id}`);
              console.log("connected to", data.id);
            });
          } else {
            socket.emit("room_id", result);
            socket.join(`room-${result._id}`);
            console.log("connected to rom", result._id);
            console.log(socket.id + " now in rooms ", socket.rooms);
          }
        })
        .catch((err) => console.log(err));
    });

    // get room message details
    socket.on("get_room_messages", (data) => {
      getChatMessage(data)
        .then((data) => {
          socket.emit("initial_chat_messages", { messages: data });
        })
        .catch((msg) => {
          console.log(msg);
        });
    });

    // create chat room message
    socket.on("create_chat_message", async(input_data) => {
    //   let data = { messages: "test" };
    const data =  await createChatMessage(input_data)
    io.in(`room-${data.room}`).emit("new_chat_message", {"messages":data});
    console.log("not waited")
  });
  });
};

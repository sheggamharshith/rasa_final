const httpStatus = require("http-status");
const { Post, chatRoom, chatRoomMessage } = require("../models");
const ApiError = require("../utils/ApiError");

// helps in creating room
const createRoom = async (data) => {
  room = await chatRoom.create(data);
  return await room.populate("users").execPopulate();
};

// helps in gettting room
const getRoomByUsers = (data) => {
  query = { users: { $all: data.users } };
  return chatRoom.findOne(query).populate("users").exec();
};

const getChatMessage = (data) => {
  return chatRoomMessage.find({room:data.id});
};

const createChatMessage = (data) => {
  return chatRoomMessage.create(data);
};

module.exports = {
  createRoom,
  getRoomByUsers,
  getChatMessage,
  createChatMessage,
};

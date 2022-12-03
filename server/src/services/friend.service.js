const mongoose = require("mongoose");
const { friend, User } = require("../models");
const Friend = require("../models/friends.model");
const { getUserById } = require("./user.service");

const createFriend = (data) => {
  return friend.create(data);
};

const getFriends = (from_user) => {
  return User.aggregate([
    {
      $lookup: {
        from: "friends",
        as: "connection",
        let: { user_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$to_user", "$$user_id"] },
                  {
                    $eq: ["$from_user", mongoose.Types.ObjectId(from_user)],
                  },
                ],
              },
            },
          },
          { $project: { status: 1, to_user: 1, from_user, _id: 0 } },
        ],
      },
    },
    { $unwind: { path: "$connection", preserveNullAndEmptyArrays: true } },
  ]);
};

const getConnectedFriends = (from_user) => {
  return Friend.find({
    $or: [
      {
        from_user: mongoose.Types.ObjectId(from_user),
        status: 2,
      },
      {
        to_user: mongoose.Types.ObjectId(from_user),
        status: 2,
      },
    ],
  }).populate(["to_user", "from_user"]);
};

const getRequestFriends = (from_user) => {
  return Friend.find({
    to_user: mongoose.Types.ObjectId(from_user),
    status: 1,
  }).populate(["to_user", "from_user"]);
};

const updateFriendRequest = async (from_user2, to_user2) => {
  console.log(from_user2)
  return Friend.updateOne(
    {
      from_user: from_user2,
      to_user: to_user2,
    },
    { status: 2 }
  );
};

module.exports = {
  getFriends,
  createFriend,
  getConnectedFriends,
  getRequestFriends,
  updateFriendRequest,
};

const { Post } = require("../models");
const { getUserById } = require("./user.service");

const createPost = async (postbody) => {
  console.log(postbody)
  return Post.create(postbody);
};

const getPostById = async (id) => {
  return Post.findById(id);
};
const getPostByUser = async (id) => {
  return Post.find({ user: id });
};

const likePost = async (id, user) => {
  let likedUser = await getUserById(user);
  console.log(likedUser);
  return Post.updateOne({ _id: id }, { $push: { likes: likedUser } });
};

const comment = async (id, user, text) => {
  let commentUser = await getUserById(user);
  let data = await Post.updateOne(
    { _id: id },
    { $push: { comments: { text: text, postedBy: user } } }
  );
  console.log(data);
  return data;
};

const queryPosts = async (filter, options) => {
  options.populate = "user,comments.postedBy";
  const users = await Post.paginate(filter, options);
  return users;
};

module.exports = {
  createPost,
  queryPosts,
  getPostById,
  getPostByUser,
  likePost,
  comment,
};

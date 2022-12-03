const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const postSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    music: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    likes: [
      {
        user: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "User",
          unique: false
        },
      },
    ],
    comments: [
      {
        text: String,
        postedBy: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "User",
          unique: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.plugin(toJSON);
postSchema.plugin(paginate);
const Post = mongoose.model("post", postSchema);
module.exports = Post;

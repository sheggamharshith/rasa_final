const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const friendsSchema = mongoose.Schema(
  {
    from_user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    to_user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

friendsSchema.index({ from_user: 1, to_user: 1 }, { unique: true });

// custom plugin
friendsSchema.plugin(toJSON);
friendsSchema.plugin(paginate);

// module export
const Friend = mongoose.model("friends", friendsSchema);
module.exports = Friend;

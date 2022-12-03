const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const { friendValidation } = require("../../validations");
const { friendController } = require("../../controllers");

const router = express.Router();

router
  .route("/")
  .post(
    auth("createFriendRequest"),
    validate(friendValidation.createFriendRequest),
    friendController.createFriendRequest
  );

router
  .route("/:userId")
  .get(
    auth("getFriendRequest"),
    validate(friendValidation.userId),
    friendController.getRequestFriends
  );

router
  .route("/update")
  .post(
    auth("updateFriendRequest"),
    validate(friendValidation.createFriendRequest),
    friendController.updateFriendRequest
  );

module.exports = router;

const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const { friendValidation } = require("../../validations");
const { friendController } = require("../../controllers");

const router = express.Router();

router
  .route("/:userId")
  .get(
    auth("getFriends"),
    validate(friendValidation.userId),
    friendController.getFriendUser
  );

router
  .route("/connected/:userId")
  .get(
    auth("getConnectedfriend"),
    validate(friendValidation.userId),
    friendController.getConnectedFriends
  );



module.exports = router;

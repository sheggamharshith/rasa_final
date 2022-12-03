const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createFriendRequest = {
  body: Joi.object().keys({
    from_user: Joi.required().custom(objectId),
    to_user: Joi.required().custom(objectId),
    status: Joi.number().required(),
  }),
};

const userId = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFriendRequest,
  userId
};

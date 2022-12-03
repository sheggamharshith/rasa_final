const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createPost = {
  body: Joi.object().keys({
    image: Joi.string(),
    user: Joi.required().custom(objectId),
    music: Joi.string(),
    text: Joi.string(),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    user: Joi.custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updatePost = {
  query: Joi.object().keys({
    user: Joi.custom(objectId),
    id: Joi.custom(objectId),
  }),
};

module.exports = {
  createPost,
  getPosts,
  updatePost
};

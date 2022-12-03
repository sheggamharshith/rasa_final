const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const postValidation = require('../../validations/post.validation');
const postController = require('../../controllers/post.controller');
const userValidation = require('../../validations/user.validation');

const Router = express.Router();


Router.route('/')
.get(auth('getPosts'),validate(postValidation.getPosts),postController.getAllPost)
.post(auth('managePost'),validate(postValidation.createPost),postController.createPost)
.put(auth('updatePost'),validate(postValidation.updatePost),postController.updatePost)


Router.route('/user/:userId')
.get(auth('getPostUserById'),validate(userValidation.getUser),postController.getPostByUserId)



module.exports = Router;

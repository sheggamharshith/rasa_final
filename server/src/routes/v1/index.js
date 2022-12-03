const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const docsRoute = require("./docs.route");
const postRoute = require("./post.route");
const friendRequestRoute = require("./firend.Request.route");
const uploadRouter = require("./upload.route");
const friendsRoute = require("./friend.route");
const config = require("../../config/config");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/post",
    route: postRoute,
  },
  {
    path: "/friend-request",
    route: friendRequestRoute,
  },
  {
    path: "/friends",
    route: friendsRoute,
  },
  {
    path: "/upload",
    route: uploadRouter,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

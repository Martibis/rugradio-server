const express = require("express");
const indexRouter = express.Router();

// Handlers
const degenRouter = require("./degen");
const hostRouter = require("./host");
const showRouter = require("./show");
const episodeRouter = require("./episode");

/* GET home page. */
indexRouter.get("/", function (req, res, next) {
  return res.send({ title: "Rugradio" });
});

indexRouter.post("/", function (req, res, next) {
  return res.send({ title: "Rugradio" });
});

const routers = [
  {
    path: "/",
    handler: indexRouter,
  },

  {
    path: "/degen",
    handler: degenRouter,
  },
  {
    path: "/host",
    handler: hostRouter,
  },
  {
    path: "/show",
    handler: showRouter,
  },
  {
    path: "/episode",
    handler: episodeRouter,
  },
];

module.exports = routers;

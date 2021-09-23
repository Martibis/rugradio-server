const express = require("express");
const router = express.Router();

const {
  removeShow,
  addShow,
  updateShow,
  getShows,
} = require("../controllers/show");

router.post("/add_show", addShow);
router.post("/remove_show", removeShow);
router.post("/update_show", updateShow);
router.get("/get_shows", getShows);

module.exports = router;

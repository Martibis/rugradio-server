const express = require("express");
const router = express.Router();

const {
  removeEpisode,
  addEpisode,
  updateEpisode,
  getEpisodes,
} = require("../controllers/episode");

router.post("/add_episode", addEpisode);
router.post("/remove_episode", removeEpisode);
router.post("/update_episode", updateEpisode);
router.post("/get_episodes", getEpisodes);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  removeHost,
  addHost,
  updateHost,
  getHosts,
} = require("../controllers/host");

router.post("/add_host", addHost);
router.post("/remove_host", removeHost);
router.post("/update_host", updateHost);
router.get("/get_hosts", getHosts);

module.exports = router;

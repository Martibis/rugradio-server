const express = require("express");
const router = express.Router();

const {
  removeDegen,
  getDegens,
  addDegen,
  updateDegen,
} = require("../controllers/degen");

router.post("/add_degen", addDegen);
router.post("/remove_degen", removeDegen);
router.post("/update_degen", updateDegen);
router.get("/get_degens", getDegens);

module.exports = router;

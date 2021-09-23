const express = require("express");
const router = express.Router();

const { removeDegen, getDegens, addDegen } = require("../controllers/degen");

router.post("/add_degen", addDegen);
router.post("/remove_degen", removeDegen);
router.get("/get_degens", getDegens);

module.exports = router;

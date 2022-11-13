const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/filecreation", async (req, res, next) => {
  try {
    res.render("filecreation");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
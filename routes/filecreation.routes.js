const express = require("express");
const router = express.Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

/* GET home page */
router.get("/filecreation", isLoggedIn, (req, res, next) => {
  try {
    res.render("filecreation", {
      style: ["style.css"],
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

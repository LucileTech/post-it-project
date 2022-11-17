const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  try {
    res.render("index", {
      style: ["introstyle.css"],
    });
  } catch (error) {
    next(error);
  }
});

router.get("/loginorregister", (req, res, next) => {
  try {
    res.render("loginregisterview", {
      style: ["logginorregister.css"],
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", {
    style: ["introstyle.css"],
  });
});

router.get("/loginorregister", (req, res, next) => {
  res.render("loginregisterview", {
    style: ["logginorregister.css"],
  });
});

module.exports = router;

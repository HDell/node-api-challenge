const express = require("express");
const router = express.Router();
const actionRoute = require("./actionRoute");
const projectRoute = require("./projectRoute");
router.use("/action", actionRoute);
router.use("/project", projectRoute);
module.exports = router;
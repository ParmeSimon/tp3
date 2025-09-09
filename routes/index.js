const express = require("express");
const router = express.Router();

const taskRoutes = require("./tasks");

router.use("/tasks", taskRoutes);

module.exports = router;

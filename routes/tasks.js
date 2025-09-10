const express = require("express")
const router = express.Router()

const taskController = require("../controllers/tasks")

router.get("/", taskController.list)

router.get("/:id", taskController.read)

router.post("/", taskController.create)

router.put("/:id", taskController.update)

router.delete("/:id", taskController.remove)

router.patch("/:id", taskController.patch)

router.patch("/:id/completed", taskController.toggleCompleted)

module.exports = router

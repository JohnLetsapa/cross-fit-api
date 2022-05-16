const express = require("express");
const apicache = require("apicache");
const workoutController = require("../../controllers/workoutController");

const router = express.Router();
const cache = apicache.middleware;

router.get("/", cache("2 minutes"), workoutController.getAllWorkouts);

router.get("/", workoutController.getAllWorkouts);

router.get("/:workoutId", workoutController.getOneWorkout);

router.post("/", workoutController.createNewWorkOut);

router.patch("/:workoutId", workoutController.updateOneWorkout);

router.delete("/:workoutId", workoutController.deleteOneWorkOut);

module.exports = router;

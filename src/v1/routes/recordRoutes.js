const express = require("express");
const workoutController = require("../../controllers/workoutController");
const recordController = require("../../controllers/recordController");

const router = express.Router();

// router.get("/", workoutController.getAllWorkouts);

// router.get("/:workoutId", workoutController.getOneWorkout);

router.get("/:workoutId/records", recordController.getRecordForWorkout);

// router.post("/", workoutController.createNewWorkOut);

// router.patch("/:workoutId", workoutController.updateOneWorkout);

// router.delete("/:workoutId", workoutController.deleteOneWorkOut);

module.exports = router;

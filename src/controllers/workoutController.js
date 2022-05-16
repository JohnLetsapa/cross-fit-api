const workoutService = require("../services/workoutService");

const getAllWorkouts = (req, res) => {
  const { mode } = req.query;

  try {
    const allWorkOuts = workoutService.getAllWorkouts({ mode });

    res.send({
      status: "OK",
      results: allWorkOuts.length,
      data: allWorkOuts,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res.status(400).send({ status: "FAILED", error: "Workout Id invalid" });
  }

  try {
    const workout = workoutService.getOneWorkout(workoutId);
    res.send({
      status: "OK",
      data: workout,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewWorkOut = (req, res) => {
  const { body } = req;
  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in the request body: name, mode, equipment, exercises, trainerTips",
      },
    });
  }

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };

  try {
    const createdWorkOut = workoutService.createNewWorkOut(newWorkout);
    res.status(201).send({
      status: "OK",
      data: createdWorkOut,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneWorkout = (req, res) => {
  const {
    body,
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res.status(400).send({ status: "FAILED", error: "Workout Id invalid" });
  }

  try {
    const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
    res.send({
      status: "OK",
      data: updatedWorkout,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneWorkOut = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res
      .status(400)
      .send({ status: "FAILED", error: "Workout Id does not exist" });
  }

  try {
    workoutService.deleteOneWorkOut(workoutId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkOut,
  updateOneWorkout,
  deleteOneWorkOut,
};

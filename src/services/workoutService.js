const workout = require("../database/workout");
const { v4: uuid } = require("uuid");

const getAllWorkouts = (filterParams) => {
  try {
    const allWorkOuts = workout.getAllWorkouts(filterParams);
    return allWorkOuts;
  } catch (error) {
    throw error;
  }
};

const getOneWorkout = (workoutId) => {
  try {
    const workoutSearched = workout.getOneWorkout(workoutId);
    return workoutSearched;
  } catch (error) {
    throw error;
  }
};

const createNewWorkOut = (newWorkout) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  try {
    const createdWorkout = workout.createNewWorkOut(workoutToInsert);
    return createdWorkout;
  } catch (error) {
    throw error;
  }
};

const updateOneWorkout = (workoutId, changes) => {
  try {
    const updatedWorkout = workout.updateOneWorkout(workoutId, changes);
    return updatedWorkout;
  } catch (error) {
    throw error;
  }
};

const deleteOneWorkOut = (workoutId) => {
  try {
    return workout.deleteOneWorkOut(workoutId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkOut,
  updateOneWorkout,
  deleteOneWorkOut,
};

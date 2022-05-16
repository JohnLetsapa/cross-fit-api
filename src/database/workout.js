const res = require("express/lib/response");
const { stringify } = require("uuid");
const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = (filterParams) => {
  try {
    let workouts = DB.workouts;
    if (filterParams.mode) {
      return workouts.filter((workout) =>
        workout.mode.toLocaleLowerCase().includes(filterParams.mode)
      );
    }
    return workouts;
  } catch (error) {
    throw { status: error.status || 500, message: error?.message || error };
  }
};

const getOneWorkout = (workoutId) => {
  try {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);
    if (!workout) {
      throw {
        status: 400,
        message: `Cannot find workout with id ${workoutId}`,
      };
    }
    return workout;
  } catch (error) {
    throw { status: error.status || 500, message: error?.message || error };
  }
};

const createNewWorkOut = (newWorkout) => {
  const isAlreadyAdded = DB.workouts.find(
    (workout) => workout.name === newWorkout.name
  );
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Workout with name ${newWorkout.name} already exists`,
    };
  }
  try {
    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const updateOneWorkout = (workoutId, changes) => {
  try {
    const indexForUpdate = DB.workouts.find(
      (workout) => workout.id === workoutId
    );
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Cannot find workout with id ${workoutId}`,
      };
    }

    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timezone: "UTC" }),
    };

    DB.workouts[indexForUpdate] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
  } catch (error) {
    throw { status: error.status || 500, message: error.message || error };
  }
};

const deleteOneWorkOut = (workoutId) => {
  try {
    const indexToDelete = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );

    if (indexToDelete === -1) {
      throw {
        status: 400,
        message: `Cannot find workout with id ${indexToDelete}`,
      };
    }

    DB.workouts.splice(indexToDelete, 1);

    saveToDatabase(DB);
  } catch (error) {
    throw { status: error.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllWorkouts,
  createNewWorkOut,
  getOneWorkout,
  updateOneWorkout,
  deleteOneWorkOut,
};

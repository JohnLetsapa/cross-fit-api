const record = require("../database/record");

const getRecordForWorkout = (workoutId) => {
  try {
    const recordSearched = record.getRecordForWorkout(workoutId);
    return recordSearched;
  } catch (error) {
    throw { status: error.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getRecordForWorkout,
};

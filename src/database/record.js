const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getRecordForWorkout = (workoutId) => {
  try {
    const record = DB.records.filter((record) => record.workout === workoutId);

    if (record.length === 0) {
      throw {
        status: 400,
        message: `Cannot find record with id ${workoutId}`,
      };
    }
    return record;
  } catch (error) {
    return { status: error.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getRecordForWorkout,
};

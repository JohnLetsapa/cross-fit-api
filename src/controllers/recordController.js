const recordService = require("../services/recordService");

const getRecordForWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res.status(400).send({
      status: "FAILED",
      message: "Invalid workout Id",
    });
  }

  try {
    const record = recordService.getRecordForWorkout(workoutId);
    res.status(200).send({
      status: "OK",
      data: record,
    });
  } catch (error) {
    throw { error: error.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getRecordForWorkout,
};

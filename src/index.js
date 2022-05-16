const express = require("express");
const bodyParser = require("body-parser");
const apicache = require("apicache");

const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const v1RecordRouter = require("./v1/routes/recordRoutes");

const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

const app = express();
const cache = apicache.middleware;

app.use(cache("2 minutes"));
app.use(bodyParser.json());
app.use("/api/v1/workouts", v1WorkoutRouter); // routes will be specified in /api/v1
app.use("/api/v1/workouts", v1RecordRouter); // routes will be specified in /api/v1

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`cross-fit-api-server running on ${PORT}`);
  V1SwaggerDocs(app, PORT);
});

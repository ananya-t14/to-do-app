const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 4000;
const userRoutes = require("./routes/user.routes");
const { connectDB } = require("./db");
const taskRoutes = require("./routes/task.routes");
const userRoutesV2 = require("./routes/v2/user.routes");
const taskRoutesV2 = require("./routes/v2/task.routes");
const { connectPostgres } = require("./db/sql");

const { hash, verifyHash } = require("./utils/auth");

app.use(express.json());
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/v2/users", userRoutesV2);
app.use("/v2/tasks", taskRoutesV2);

app.get("/", async (req, res) => {
  res.json({ Message: "Welcome" });
});

app.listen(PORT, () => {
  console.log(`Server is running on the ${PORT}`);
  connectDB();
  connectPostgres();
});

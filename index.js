/* eslint-disable no-console */
const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

const app = express();
const PORT = 4000;
const { connectDB } = require('./db/index.mongo');
const userRoutes = require('./routes/v1/user.routes');
const taskRoutes = require('./routes/v1/task.routes');
// const { connectPostgres } = require("./db/index.sql");
// const userRoutesV2 = require("./routes/v2/user.routes");
// const taskRoutesV2 = require("./routes/v2/task.routes");
// const { hash, verifyHash } = require('./utils/auth');

app.use(express.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
// app.use("/v2/users", userRoutesV2);
// app.use("/v2/tasks", taskRoutesV2);

app.get('/', async (req, res) => {
  res.json({ Message: 'Welcome' });
});

app.listen(PORT, () => {
  console.log(`Server is running on the ${PORT}`);
  connectDB();
  // connectPostgres();
});

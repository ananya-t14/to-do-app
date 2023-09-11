const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const PORT = 4000
const userRoutes = require("./routes/user.routes")
const {connectDB} = require("./db")
const taskRoutes = require("./routes/task.routes")


app.use("/users", userRoutes)
app.use("/users/tasks", taskRoutes)
app.get("/", (req, res)=> {
    res.status(200).json({message: "Welcome"})
})

app.listen(PORT,()=>
{
    console.log(`Server is running on the ${PORT}`)
    connectDB()
})
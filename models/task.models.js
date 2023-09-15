const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: 120
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
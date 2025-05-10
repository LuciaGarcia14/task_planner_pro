const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: String,

    dueDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'in progress', 'completed'],
        default: 'pending'
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
},
{
    timestamps: true
    
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
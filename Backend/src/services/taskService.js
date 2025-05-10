const Task = require('../models/task');

async function createTask(taskData){
    try{
        const newTask = new Task(taskData);
        const savedTask = await newTask.save();
        return savedTask;
    }catch(error){
        console.error('Error creating task:', error);
        throw error;
    }
}

async function getTasksByUser(userId){
    try{
        const tasks = await Task.find({user: userId});
        return tasks;
    }catch(error){
        console.error('Error fetching user tasks:', error);
        throw error;
    }
}

async function getTaskById(taskId) {
    try{
        const task = await Task.findById(taskId);
        return task;
    }catch(error){
        console.error('Error fetching task by ID:', error);
        throw error;
    }
}

async function updateTask(taskId, updateData){
    try{
        const updateTask = await Task.findByIdAndUpdate(taskId, updateData, {
            new: true,
            runValidators: true
        });
        return updateTask;
    }catch(error){
        console.error('Error updating task:', error);
        throw error;
    }
}

async function deleteTask(taskId){
    try{
        const deleteTask = await Task.findByIdAndDelete(taskId);
        return deleteTask;
    }catch(error){
        console.error('Error deleting task:', error);
        throw error;
    }
}

module.exports = {
    createTask,
    getTasksByUser,
    getTaskById,
    updateTask,
    deleteTask
}
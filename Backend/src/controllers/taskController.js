const {
    createTask,
    getTasksByUser,
    getTaskById,
    updateTask,
    deleteTask
} = require('../services/taskService');

const taskController = {
    createTask: async(req, res) =>{
        try{
            const taskData = {
                ...req.body,
                user: req.user.id
            };

            const task = await createTask(taskData);
            res.status(201).json(task);
        }catch(error){
            console.error('Error creating task:', error);
            res.status(500).json({ error: 'Error creating task' })
        }
    },

    getUserTask: async(req, res) =>{
        try{
            const tasks = await getTasksByUser(req.user.id);
            res.status(200).json(tasks);
        }catch(error){
            console.error('Error fetching tasks:', error);
            res.status(500).json({error: 'Error fetching tasks'});
        }
    },

    getTaskById: async(req, res) =>{
        try{
            const task = await getTaskById(req.params.id);

            if(task.user.toString() !== req.user.id){
                return res.status(403).json({error: 'Unauthorized'});
            }

            res.status(200).json(task);
        }catch(error){
            console.error('Error fetching task by ID:', error);
            res.status(500).json({error: 'Error fetching task by ID'});
        }
    },

    updateTask: async(req, res) =>{
        try{
            const task = await getTaskById(req.params.id);

            if(!task){
                return res.status(404).json({error: 'Task not found'});
            }

            if(task.user.toString() !== req.user.id){
                return res.status(403).json({error: 'Unauthorized'});
            }

            const updated = await updateTask(req.params.id, req.body);
            res.status(200).json(updated);
        }catch(error){
            console.error('Error updating task:', error);
            res.status(500).json({error: 'Error updating task'});
        }
    },

    deleteTask: async(req, res) => {
        try{
            const task = await getTaskById(req.params.id);

            if(!task){
                return res.status(404).json({error: 'Task not found'});
            }

            if(task.user.toString() !== req.user.id){
                return res.status(403).json({error: 'Unauthorized'});
            }

            const deleted = await deleteTask(req.params.id);
            res.status(200).json(deleted);
        }catch(error){
            console.error('Error deleting task:', error);
            res.status(500).json({error: 'Error deleting task'});
        }
    }
};

module.exports = taskController;
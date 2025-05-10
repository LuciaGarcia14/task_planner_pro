const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb+srv://Loufty14:1652013pP@taskplanner.zo7sirz.mongodb.net/Database_project');

        console.log('Database connected succesfully');
    }catch(error){
        console.error('Database connection error:', error);
        process.exit(1);
    }
};
//connectDB();

module.exports = connectDB;
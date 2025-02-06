const express  = require('express');
const task = require('../models/task');
const authentication = require('../middleware/auth');
const user = require('../models/user');

const router = express.Router();

// get all task for the logged-in user
router.get('/',authentication,async(req,res)=>{
    try{
        const tasks = await task.find({user:req.user.id});
        res.json(tasks);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

// create a new task
router.post('/addNewtask',authentication,async(req,res)=>{
    try{
        const {description,completed} = req.body;
        const Task = new task({
            user:req.user.id,
            description,
            completed:completed  || false,
        });

        const newTask = await Task.save();
        res.status(201).json(newTask);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});

// update the task
router.put('/:taskId',authentication,async(req,res)=>{
    try{
        const task = await Task.findOne({_id:req.params.taskId,user:req.user.id});
        if(!task){
            return res.status(404).json({message:'Task not found'});
        }
        if(req.body.description!=null){
            task.description = req.body.description;
        }
        if(req.body.completed != null){
            task.completed = req.body.completed;
        }
        const updatedTask = await task.save();
        res.json(updatedTask);
    }
    catch(err){
        return res.status(400).json({message:err.message});
    }
});


router.delete('/:taskId',authentication,async(req,res)=>{
    try{
        const task = await Task.findOne({_id:req.params.taskId,user:req.user.id});
        if(!task){
            return res.status(404).json({message:'Task not found'});
        }
        await task.remove();
        res.json({message:'task deleted'});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports = router;
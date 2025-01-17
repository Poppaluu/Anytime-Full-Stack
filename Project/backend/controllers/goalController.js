const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc   Get goals
// @route  GET /api/goals
// @access Public
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id});
    res.status(200).json(goals);
});

// @desc   Set a goal
// @route  POST /api/goals
// @access Public
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    });

    res.status(200).json(goal);
});

// @desc   Update a goal
// @route  PUT /api/goals/:id
// @access Public
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(404);
        throw new Error('Goal not found');
    }

    if(!req.user){
        res.status(401)
        throw new Error("User not found")
    }

    //make sure that logged user mathces the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not authorized")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedGoal);
});

// @desc   Delete a goal
// @route  DELETE /api/goals/:id
// @access Public
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(404);
        throw new Error('Goal not found');
    }

    if(!req.user){
        res.status(401)
        throw new Error("User not found")
    }

    //make sure that logged user mathces the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not authorized")
    }

    await Goal.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Goal removed' });
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
};
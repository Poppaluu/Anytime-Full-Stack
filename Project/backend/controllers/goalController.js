

// @desc   Get all goals
// @route  GET /api/goals
// @access Public
const getGoals = (req, res) => {

    res.status(200).json({message: 'get goals'});
};

// @desc   Set a goal
// @route  POST /api/goals
// @access Public
const setGoal = (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('text is required');
    }

    res.status(200).json({message: 'set goal!'});
};

// @desc   Update a goal
// @route  PUT /api/goals/:id
// @access Public
const updateGoal = (req, res) => {
    res.status(200).json({message: `update goal ${req.params.id}`});
};

// @desc   Delete a goal
// @route  DELETE /api/goals/:id
// @access Public
const deleteGoal = (req, res) => {
    res.status(200).json({message: `delete goal ${req.params.id}`});
};


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
};
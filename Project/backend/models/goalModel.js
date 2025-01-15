const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        ref: 'User',
    },
    text: {
        type: String,
        required: [true, 'text is required']
    },
},
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model('Goal', goalSchema);
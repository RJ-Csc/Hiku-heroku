var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    taskName: {
        type: String,
        required: true
    },
    lootType: {
        type: Number,
        required: false
    },
    lootName: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    lootIndex: {
        type: Number,
        required: false
    },
    expGain: {
        type: Number,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    }

});

module.exports = mongoose.model('Task', TaskSchema);

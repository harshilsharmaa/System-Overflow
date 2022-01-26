var mongoose = require('mongoose');


const answerSchema = mongoose.Schema({
    answer:{
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Register'
    },
    date:{
        type:Date,
        default: Date.now
    }
})

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
var mongoose = require('mongoose');


var questionSchema = mongoose.Schema({

    title: {
        type: String
    },
    description: {
        type: String
    },
    tags: [
        {
            type:String
        }
    ],
    mainimage: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Register'
    },
    date: {
        type: Date,
        default: Date.now
    },
    answers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Answer'
        }
    ]
})



const Question = new mongoose.model("Question", questionSchema);

module.exports = Question;
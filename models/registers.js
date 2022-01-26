var mongoose = require('mongoose');
const bcrypt =  require('bcryptjs');


const userSchema = mongoose.Schema({
    googleId:{
        type:String,
        required: true
    },
    displayName:{
        type:String,
        required: true
    },
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    image:{
        type:String,
    },
    questions:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Question'
        }
    ],
    answers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Answer'
        }
    ]
});

// hash the password
userSchema.pre('save', async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
})

// we need to create collection

const Register = new mongoose.model("Register", userSchema);



module.exports = Register;
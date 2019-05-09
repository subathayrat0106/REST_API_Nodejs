const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    first_name:{type:String , required:true},
    last_name:{type:String , required:true},
    email:{type:String , required:true},
    job_type:String,
    address:{
        stree_address:String,
        city:String,
        state:String,
        zip_code:Number
    },
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:'Comment',
        }
     ]
});

module.exports = mongoose.model('User',userSchema);
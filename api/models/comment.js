const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{type:String , required:true},
    content:{type:String , required:true},
    createdAt:{type: Date, default: Date.now},
});

module.exports = mongoose.model('Comment',commentSchema);
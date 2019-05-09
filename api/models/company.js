const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String , required:true},
    suffix :{type:String , required:true},
    url:{type:String , required:true},
    finance:{
        account_name:{type:String , required:true},
        account_number:{type:Number , required:true},
    }
});

module.exports = mongoose.model('Company',companySchema);
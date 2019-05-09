const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    quantity:{type:Number,default: 1}
});

module.exports = mongoose.model('Company',companySchema);
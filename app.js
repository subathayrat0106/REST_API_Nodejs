const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/user');
const commentRoutes = require('./api/routes/comment')
const companyRoutes = require('./api/routes/company')

mongoose.connect('mongodb+srv://subat1988:'+process.env.MONGO_ATLAS_PW+'@rest-api-nodejs-olmgn.mongodb.net/test?retryWrites=true',{useNewUrlParser: true});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req ,res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Headers','Origin,X-Requested-With, Content-Type, Accept,Authorization'
        );
        if(req.method ==='OPTIONS'){
            res.header('Access-Control-Allow-Methods','GET,PUT,POST,PATCH,DELETE');
            return res.status(200).json({});
        }
        next();
})

app.use('/user',userRoutes);
app.use(commentRoutes);
app.use('/company',companyRoutes)
//app.use('/company',companyRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
      error:{
          message : error.message
      }
  })
});

module.exports = app
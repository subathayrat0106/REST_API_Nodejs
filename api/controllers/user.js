const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/user");

exports.user_get_all =(req,res,next)=>{
    User.find()
    .populate('comments')
    .select("-__v")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        user: docs.map(doc => {
          return {
            _id: doc._id,
            first_name: doc.first_name,
            last_name: doc.last_name,
            email:doc.email,
            job_type:doc.job_type,
            address:{
              street_address:doc.address.street_address,
              city:doc.address.city,
              state:doc.address.state,
              zip_code:doc.address.zip_code
            },
            request: {
              type: "GET",
              description: "GET SINGLE USER",
              url: req.get('host')+'/user/'+ doc._id 
            }
          };
        })
      };
         if (docs.length >= 0) {
      res.status(200).json(response);
      } else {
           res.status(404).json({
               message: 'No user found'
             });
        }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.users_create_one = (req,res,next)=>{
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email:req.body.email,
        job_type:req.body.job_type,
        address:{
          street_address:req.body.address.street_address,
          city:req.body.address.city,
          state:req.body.address.state,
          zip_code:req.body.address.zip_code,
        },
      });
      console.log(user)
      user
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Created user successfully",
            createdUser: result,
                request: {
                    type: 'GET',
                    url: req.get('host')+'/user/'+ result._id 
                }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
} 

exports.user_get_one = (req,res,next) =>{
    const id = req.params.userId;
  User.findById(id)
    .populate('comments')
    .select("-__v")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            user: doc,
            request: {
                type: 'GET',
                url: req.get('host')+'/user'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

exports.user_update_all = (req,res,next)=>{
    User.findByIdAndUpdate(req.params.userId,
        {
          $set:{
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email:req.body.email,
            job_type:req.body.job_type,
            address:{
          street_address:req.body.address.street_address,
          city:req.body.address.city,
          state:req.body.address.state,
          zip_code:req.body.address.zip_code,
        }
          }
        })
        .exec()
        .then(result => {
          res.status(200).json({
              message: 'User updated',
              request: {
                  type: 'GET',
                  url: req.get('host')+'/user/'+ req.params.userId
              }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
}

exports.user_update_one = (req,res,next)=>{
    const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.findByIdAndUpdate({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'User updated',
          request: {
              type: 'GET',
              url: req.get('host')+'/user'+ result._id 
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.user_delete_one = (req,res,next)=>{
    const id = req.params.userId;
    User.deleteOne({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'user deleted',
            request: {
                type: 'POST',
                url: req.get('host')+'/user',
                body: { _id:mongoose.Schema.Types.ObjectId,
                  first_name:'String',
                  last_name:'String',
                  email:'String',
                  job_type:'String',
                  address:{
                      street_address:'String',
                      city:'String',
                      state:'String',
                      zip_code:'Number'
                  },
                       }
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}
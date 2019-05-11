const express = require("express");
const mongoose = require("mongoose");

const Company = require("../models/company");

exports.company_get_all = (req,res,next)=>{
    Company.find()
    .select("-__v")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            name:doc.name,
            suffix:doc.suffix,
            url:doc.url,
            finance:{
              account_name:doc.finance.account_name,
              account_number:doc.finance.account_number
            },
            request: {
              type: "GET",
              url: req.get('host')+'/company/'+ doc._id 
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

exports.company_create_one = (req,res,next)=>{
    const company = new Company({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        suffix:req.body.suffix,
        url:req.body.url,
        finance:{
          account_name:req.body.finance.account_name,
          account_number:req.body.finance.account_number
        },
      });
      company
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Created company successfully",
            createdUser: result,
                request: {
                    type: 'GET',
                    url: req.get('host')+'/company/'+ result._id 
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

exports.company_get_one = (req,res,next)=>{
    const id = req.params.companyId;
    Company.findById(id)
      .select("-__v")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              company: doc,
              request: {
                  type: 'GET',
                  url: req.get('host')+'/company'
              }
          });
        } else {
          res
            .status(404)
            .json({ message: "No company found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
}

exports.company_update_all = (req,res,next)=>{
    Company.updateOne(req.param.companyId,{
        $set:{
          name:req.body.name,
        suffix:req.body.suffix,
        url:req.body.url,
        finance:{
          account_name:req.body.finance.account_name,
          account_number:req.body.finance.account_number
        },
        }
      })
      .exec()
        .then(result => {
          res.status(200).json({
              message: 'Company updated',
              request: {
                  type: 'GET',
                  url: req.get('host')+'/company/'+ req.param.companyId
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

exports.company_update_one = (req,res,next)=>{
    const id = req.params.companyId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Company.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Company updated',
            request: {
                type: 'GET',
                url: req.get('host')+'/company/'+ id
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

exports.company_delete_one = (req,res,next)=>{
    Company.remove({ _id: req.params.companyId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Company deleted",
        request: {
          type: "POST",
          url: req.get('host')+'/company',
          body: {  
            name:'String',
            suffix:'String',
            url:'String',
            finance:{
              account_name:'String',
              account_number:'Number' }
            }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}
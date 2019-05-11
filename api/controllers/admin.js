    
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin");

exports.admin_signup = (req, res, next) => {
  Admin.find({ email: req.body.email })
    .exec()
    .then(admin => {
      if (admin.length >= 1) {
        return res.status(409).json({
          message: "Admin exists ,please sign up with different email"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const admin = new Admin({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            admin
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "Admin created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.admin_login = (req, res, next) => {
  Admin.find({ email: req.body.email })
    .exec()
    .then(admin => {
      if (admin.length < 1) {
        return res.status(401).json({
          message: "Auth failed ! Please enter correct password or username"
        });
      }
      bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed ! Please enter correct password or username"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: admin[0].email,
              adminId: admin[0]._id
            },
            process.env.JWT_KEY,
            {
                expiresIn: 86400,
            },
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed ! Please enter correct password or username"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.admin_delete = (req, res, next) => {
  Admin.deleteOne({ _id: req.params.adminId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Admin deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
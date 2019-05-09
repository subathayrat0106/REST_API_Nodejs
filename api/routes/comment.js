const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/user");
const Comment = require("../models/comment")


router.post("/user/:id/comment",function(req,res){
    User.findById(req.params.id,function(err,user){
        const userId = req.params.id
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            })
        }else{
            var title = req.body.title;
            var content = req.body.content;
            var newComment ={
                _id: new mongoose.Types.ObjectId(),
                title : title,
                content : content
            }
            Comment.create(newComment,function(err,comment){
                if(err){
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                }else{
                    comment.save();
                    user.comments.push(comment);
                    user.save();
                    console.log(user);
                    res.status(200).json({
                        message:"comment created successfully",
                    })
                }
            });
        }
    });
});


router.get("/user/:id/comment/:commentId", (req, res, next) => {
  const id = req.params.commentId;
  Comment.findById(id)
    .select("-__v")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            comment: doc,
            request: {
                type: 'POST',
                url: 'http://localhost:3000/'+req.params.id +'/comment',
                body:{
                    title:'String',
                    content:'String'
                }
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid item found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.put('/user/:id/comment/update/:commentId/', (req, res, next) => {
  const id = req.params.commentId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Comment.findByIdAndUpdate({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Comment updated',
          request: {
              type: 'GET',
              url: 'http://localhost:3000/user/' + req.params.id +'/comment/' + id
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/user/:id/comment/delete/:commentId/", (req, res, next) => {
  const id = req.params.commentId;
  Comment.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'comment deleted',
          request: {
            type: 'POST',
            url: 'http://localhost:3000/'+req.params.id +'/comment',
            body:{
                title:'String',
                content:'String'
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
});

module.exports = router;
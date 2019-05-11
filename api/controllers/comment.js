const mongoose = require("mongoose");
const User = require("../models/user");
const Comment = require("../models/comment")

exports.comment_post_one = (req,res,next)=>{
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
}

exports.comment_get_one = (req,res,next)=>{
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
                  url: req.get('host')+'/user/'+req.params.id +'/comment',
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
}

exports.comment_update_all = (req,res,next)=>{
    Comment.findByIdAndUpdate(req.params.commentId, 
        { $set: {
            title:req.body.title,
            content:req.body.content
          }
         })
        .exec()
        .then(result => {
          res.status(200).json({
              message: 'Comment updated',
              request: {
                  type: 'GET',
                  url: req.get('host')+'/user/'+req.params.id +'/comment/' + id
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

exports.comment_delete_one = (req,res,next)=>{
    const id = req.params.commentId;
    Comment.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'comment deleted',
            request: {
              type: 'POST',
              url: req.get('host')+'/user/'+req.params.id +'/comment',
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
}
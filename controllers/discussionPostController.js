const moment = require('moment');

const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const ForumDiscussion = require('../models/ForumDiscussionModel.js');

const discussionPostController = {

  getDiscussionPost: function(req, res) {

    var query = {postID: req.params.postID};

    var projection = 'username profpic postID postedAt title content rating';

    var details = {};

    if (req.session.username) {
      details.flag = true;
      details.name = req.session.username;
    }
    else {
      details.flag = false;
    }

    db.findOne(ForumDiscussion, query, projection, function(result) {
      if (result != null) {
        details.username = result.username;
        details.profpic = result.profpic;
        details.postID = result.postID;
        details.title = result.title;
        details.content = result.content;
        details.rating = result.rating;

        details.loggedIn = req.session.username;

        var date = new Date(result.postedAt);
        details.postedAt = moment(date).fromNow();

        ForumDiscussion.findOne({postID: details.postID}, 'comments').exec((err, result) => {
          if (err) {
            console.log('comments load error');
          }
          else {
            result = JSON.stringify(result);
            result = JSON.parse(result);

            for (var i = 0; i < result.comments.length; i++) {
              var date = new Date(result.comments[i].repliedAt);
              result.comments[i].repliedAt = moment(date).fromNow();
            }
            details.replies = result.comments;
            //details.replies.reverse();
            res.render('discussionPage', details);
          }
        });
      }
      else {
        res.render('error', details);
      }
    });
  },

  postComment: function(req, res) {
    var username = req.session.username;
    var details = {};
    db.findOne(User, {username: username}, '', function(result) {
      if (result != null) {
        details.profpic = result.profpic;
        var postID = req.params.postID;

        var profpic = details.profpic;

        var content = req.body.replysubmission;
        if (content == '')
          content = 'No Content';
        var comment = {
          username: username,
          profpic: profpic,
          comment: content,
          rating: 0
        };
        db.updateOne(ForumDiscussion, {postID: postID}, { $push: {comments: comment} }, function (flag) {
          if (flag) {
            res.redirect('/forum/discussion/post/' + postID);
          }
        });
      }
      else {
        res.render('error', details);
      }
    });
  },

  getRating: function(req, res) {
    var postID = req.query.postID;
    db.findOne(ForumDiscussion, {postID: postID}, '', function(result) {
      res.send(result);
    });
  },

  deletePost: function(req, res) {
    var postID = req.body.postID;
    db.deleteOne(ForumDiscussion, {postID: postID}, function(flag) {
      if (flag) {
        console.log('Deleted ' + postID);
      }
      else {
        console.log('Failed to delete ' + postID);
      }
    });
  }
}

module.exports = discussionPostController;

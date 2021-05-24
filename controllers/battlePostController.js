const moment = require('moment');

const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const ForumBattle = require('../models/ForumBattleModel.js');

const battlePostController = {

  getBattlePost: function(req, res) {

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

    db.findOne(ForumBattle, query, projection, function(result) {
      if (result != null) {
        details.username = result.username;
        details.profpic = result.profpic;
        details.postID = result.postID;
        details.title = result.title;
        details.content = result.content;
        details.rating = result.rating;

        var date = new Date(result.postedAt);
        details.postedAt = moment(date).fromNow();

        ForumBattle.findOne({postID: details.postID}, 'comments').exec((err, result) => {
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
            res.render('battlePage', details);
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
        db.updateOne(ForumBattle, {postID: postID}, { $push: {comments: comment} }, function (flag) {
          if (flag) {
            res.redirect('/forum/battle/post/' + postID);
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
    db.findOne(ForumBattle, {postID: postID}, '', function(result) {
      res.send(result);
    });
  }
}

module.exports = battlePostController;

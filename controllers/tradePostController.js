const moment = require('moment');

const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const ForumTrade = require('../models/ForumTradeModel.js');
const Trade = require('../models/TradeModel.js');

const battlePostController = {

  getTradePost: function(req, res) {

    var query = {postID: req.params.postID};

    var projection = 'username profpic postID postedAt title content rating';
    var projection2 = 'username charOwned weapOwned armOwned shieldOwned';
    var projection3 = 'itemName';
    var details = {};

    if (req.session.username) {
      details.flag = true;
      details.name = req.session.username;
      uName = req.session.username;
      db.findOne(User, {username:uName}, projection2, function(result) {
        details.username = result.username;
        details.charOwned = result.charOwned;
        details.weapOwned = result.weapOwned;
        details.armOwned = result.armOwned;
        details.shieldOwned = result.shieldOwned;
      });
    }
    else {
      details.flag = false;
    }

    db.findOne(ForumTrade, query, projection, function(result) {
      if (result != null) {
        details.username = result.username;
        details.profpic = result.profpic;
        details.postID = result.postID;
        details.title = result.title;
        details.content = result.content;
        details.rating = result.rating;

        var date = new Date(result.postedAt);
        details.postedAt = moment(date).fromNow();
        ForumTrade.findOne({postID: details.postID}, 'comments').exec((err, result) => {
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
            res.render('tradePage', details);
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
        db.updateOne(ForumTrade, {postID: postID}, { $push: {comments: comment} }, function (flag) {
          if (flag) {
            res.redirect('/forum/trade/post/' + postID);
          }
        });

      }
      else {
        res.render('error', details);
      }
    });
  },

  postTradeOffer: function(req, res) {
    var name = req.session.username;
    var username = req.body.username;
    var offerIndex = req.body.offerIndex;
    var offerType = req.body.offerType;
    var offerName = req.body.offerName;
    var itemName = req.body.itemName;

    var offer = {
      username:name,
      item: itemName,
      offerIndex:offerIndex,
      offerType:offerType,
      offerName:offerName
    };

    console.log(username);
    db.updateOne(Trade, {username: username}, { $push: {tradeOffers: offer} }, function (flag) {
      console.log(flag)
    });
    // pull from user inventory
    if(offerType==0)
      db.updateOne(User, {username: name}, { $pull: {charOwned: offerIndex} }, function (flag) {
          if (flag) {
            console.log('pushed ' + offerIndex);
          }
          else{
            console.log(flag);
          }
        });
    if(offerType==1)
      db.updateOne(User, {username: name}, { $pull: {weapOwned: offerIndex} }, function (flag) {
          if (flag) {
            console.log('pushed ' + offerIndex);
          }
          else{
            console.log(flag);
          }
        });
    if(offerType==2)
      db.updateOne(User, {username: name}, { $pull: {shieldOwned: offerIndex} }, function (flag) {
          if (flag) {
            console.log('pushed ' + offerIndex);
          }
          else{
            console.log(flag);
          }
        });
    if(offerType==3)
      db.updateOne(User, {username: name}, { $pull: {armOwned: offerIndex} }, function (flag) {
          if (flag) {
            console.log('pushed ' + offerIndex);
          }
          else{
            console.log(flag);
          }
        });
  },
  getTradeOffers: function(req, res) {
    var username = req.query.username;
    db.findOne(Trade, {username: username}, 'tradeOffers', function(result) {
      console.log(result);
      res.send(result);
    });
  },

  getRating: function(req, res) {
    var postID = req.query.postID;
    db.findOne(ForumTrade, {postID: postID}, '', function(result) {
      res.send(result);
    });
  }
}

module.exports = battlePostController;

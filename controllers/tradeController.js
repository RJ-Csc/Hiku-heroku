const moment = require('moment');

const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const Trade = require('../models/TradeModel.js');
const ForumTrade = require('../models/ForumTradeModel.js');

const tradeController = {

  getTrade: function(req, res) {
    var query = {username: req.params.username};

    var projection = 'username charOwned armOwned weapOwned shieldOwned';
    var projection2 = 'username itemName itemType itemIndex tradeOffers'
    var details = {};

    if (req.session.username) {
      details.flag = true;
      details.name = req.session.username;
    }
    else {
      details.flag = false;
    }
    db.findOne(Trade, query, projection2, function(result) {
      if (result != null) {
        details.username = result.username;
        details.itemName = result.itemName;
        details.itemType = result.itemType;
        details.itemIndex = result.itemIndex;
        details.tradeOffers = result.tradeOffers;
      }
    });
    db.findOne(User, query, projection, function(result) {
      if (result != null) {
        details.username = result.username;
        details.charOwned = result.charOwned;
        details.armOwned = result.armOwned;
        details.weapOwned = result.weapOwned;
        details.shieldOwned = result.shieldOwned;

        res.render('trade', details);
      }
      else {
        res.render('error', details);
      }
    });
  },
  postTrade: function(req, res){
    var username = req.session.username;
    var itemName = req.body.itemName;
    var itemType = req.body.itemType;
    var itemIndex = req.body.itemIndex;

    var trade = {
          username: username,
          itemName: itemName,
          itemType: itemType,
          itemIndex: itemIndex,
          tradeOffers:[]
        }

    if(itemType==0)
    db.updateOne(User, {username: username}, { $pull: {charOwned: itemIndex} }, function (flag) {
        if (flag) {
          console.log('removed ' + itemIndex);
          //res.redirect('/trade/' + username);
        }
        else{
          console.log('char '+ flag);
        }
      });
  if(itemType==1)
    db.updateOne(User, {username: username}, { $pull: {weapOwned: itemIndex} }, function (flag) {
        if (flag) {
          console.log('removed ' + itemIndex);
          //res.redirect('/trade/' + username);
        }
        else{
          console.log(flag);
        }
      });
  if(itemType==2)
    db.updateOne(User, {username: username}, { $pull: {shieldOwned: itemIndex} }, function (flag) {
        if (flag) {
          console.log('removed ' + itemIndex);
          //res.redirect('/trade/' + username);
        }
        else{
          console.log(flag);
        }
      });
  if(itemType==3)
    db.updateOne(User, {username: username}, { $pull: {armOwned: itemIndex} }, function (flag) {
        if (flag) {
          console.log('removed ' + itemIndex);
          //res.redirect('/trade/' + username);
        }
        else{
          console.log(flag);
        }
      });
    db.insertOne(Trade, trade, function(flag) {
        console.log(flag);
        if (flag) {
          console.log('trade posted');
        }
      });
  },
  acceptTrade: function(req, res) {
    var username = req.body.username;
    var usernameOfferer = req.body.usernameOfferer;
    var itemType = req.body.itemType;
    var itemIndex = req.body.itemIndex;
    var offerType = req.body.offerType;
    var offerIndex = req.body.offerIndex;
        db.deleteOne(Trade, {username:username}, (err,result) => {
            if(err) {
              console.error(err);
            }
            else{
              console.log(':)');
            }
        });
        if(offerType==0)
          db.updateOne(User, {username: username}, { $push: {charOwned: offerIndex} }, function (flag) {
              if (flag) {
                console.log('pushed ' + offerIndex);
              }
              else{
                console.log(flag);
              }
            });
        if(offerType==1)
          db.updateOne(User, {username: username}, { $push: {weapOwned: offerIndex} }, function (flag) {
              if (flag) {
                console.log('pushed ' + offerIndex);
              }
              else{
                console.log(flag);
              }
            });
        if(offerType==2)
          db.updateOne(User, {username: username}, { $push: {shieldOwned: offerIndex} }, function (flag) {
              if (flag) {
                console.log('pushed ' + offerIndex);
              }
              else{
                console.log(flag);
              }
            });
        if(offerType==3)
          db.updateOne(User, {username: username}, { $push: {armOwned: offerIndex} }, function (flag) {
              if (flag) {
                console.log('pushed ' + offerIndex);
              }
              else{
                console.log(flag);
              }
            });

        if(itemType==0)
          db.updateOne(User, {username: usernameOfferer}, { $push: {charOwned: itemIndex} }, function (flag) {
              if (flag) {
                console.log('offerer pushed ' + offerIndex);
                res.redirect('/trade/' + username);
              }
              else{
                console.log(flag);
              }
            });
        if(itemType==1)
          db.updateOne(User, {username: usernameOfferer}, { $push: {weapOwned: itemIndex} }, function (flag) {
              if (flag) {
                console.log('offerer pushed ' + offerIndex);
                res.redirect('/trade/' + username);
              }
              else{
                console.log(flag);
              }
            });
        if(itemType==2)
          db.updateOne(User, {username: usernameOfferer}, { $push: {shieldOwned: itemIndex} }, function (flag) {
              if (flag) {
                console.log('offerer pushed ' + offerIndex);
                res.redirect('/trade/' + username);
              }
              else{
                console.log(flag);
              }
            });
        if(itemType==3)
          db.updateOne(User, {username: usernameOfferer}, { $push: {armOwned: itemIndex} }, function (flag) {
              if (flag) {
                console.log('offerer pushed ' + offerIndex);
                res.redirect('/trade/' + username);
              }
              else{
                console.log(flag);
              }
            });

  },
  getCheckTrade: function(req, res) {
    var username = req.query.username;
    console.log('entered check trade');
    db.findOne(Trade, {username: username}, 'username', function (result) {
      res.send(result);
    });
  },
  postForumTrade: function(req, res) {
    var username = req.session.username;
    var details = {};
    console.log('inside postForumTrade');
    db.findOne(User, {username: username}, '', function(result) {
      if (result != null) {
        var profpic = result.profpic;
        var title = req.body.itemName + ' for trade!';

        var content = req.body.itemName;

        var trade = {
          username: username,
          profpic: profpic,
          title: title,
          content: content,
          comments: [],
          rating: 0
        };
        console.log('POSTING IN FORUM!!');
        db.insertOne(ForumTrade, trade, function(flag) {
          console.log(flag);
          if (flag) {
            console.log('Added ' + trade.title);
            res.redirect('/forum/trade/' + username);
          }
        });
      }
      else {
        res.render('error', details);
      }
    });

  },
  removeTrade: function(req, res) {
    var username = req.body.username;
    var itemType = req.body.itemType;
    var itemIndex = req.body.itemIndex;
    console.log('removing trade');
    db.deleteOne(Trade, {username:username}, (err,result) => {
      if(err) {
        console.error(err);
      }
      else{
        console.log(':)');
      }
    });
    db.deleteOne(ForumTrade, {username:username}, (err,result) => {
      if(err) {
        console.error(err);
      }
      else{
        console.log(':)');
      }
    });
    if(itemType==0)
      db.updateOne(User, {username: username}, { $push: {charOwned: itemIndex} }, function (flag) {
        if (flag) {
          console.log('selfpushed ' + itemIndex);
          res.redirect('/trade/' + username);
        }
        else{
          console.log(flag);
        }
      });
    if(itemType==1)
      db.updateOne(User, {username: username}, { $push: {weapOwned: itemIndex} }, function (flag) {
        if (flag) {
          console.log('selfpushed ' + itemIndex);
          res.redirect('/trade/' + username);
        }
        else{
          console.log(flag);
        }
      });
    if(itemType==2)
      db.updateOne(User, {username: username}, { $push: {shieldOwned: itemIndex} }, function (flag) {
        if (flag) {
          console.log('selfpushed ' + itemIndex);
          res.redirect('/trade/' + username);
        }
        else{
          console.log(flag);
        }
      });
    if(itemType==3)
      db.updateOne(User, {username: username}, { $push: {armOwned: itemIndex} }, function (flag) {
        if (flag) {
          console.log('selfpushed ' + itemIndex);
          res.redirect('/trade/' + username);
        }
        else{
          console.log(flag);
        }
      });
  }
}

module.exports = tradeController;

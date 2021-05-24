const moment = require('moment');

const mongoose = require('mongoose');

const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const ForumBattle = require('../models/ForumBattleModel.js');

const battleController = {

  getBattle: function(req, res) {
    var query = {username: req.params.username};

    var projection = 'username profpic';

    var details = {};

    if (req.session.username) {
      details.flag = true;
      details.name = req.session.username;
    }
    else {
      details.flag = false;
    }

    db.findOne(User, query, projection, function(result) {
      if (result != null) {
        details.username = result.username;
        details.profpic = result.profpic;

        var battles = [
          {
            bossName: "Attack on Tanti",
            level: 76,
            bossImg: 'mob1',
            description: 'A titan known as Tanti has been seen roaming a nearby forest. It has been said that he is weak against bladed weapons. However, be cautious as his claws rip easily through wooden defenses and leather armor. ',
            loot: 'Spiked Guard',
          },
          {
            bossName: "Battle for Bacsi's Village",
            level: 12,
            bossImg: 'mob2',
            description: 'Bacsi\'s Village is being invaded by Rica and her chicken army. Sources say her and her army are weak against ranged or flaming weapons. Shields offer no defense as her chickens can easily overtake you. ',
            loot: 'Warhammer',
          },
          {
            bossName: "Mischievous Mr. Lerhit",
            level: 44,
            bossImg: 'mob3',
            description: 'Mr. Lerhit is wreaking mischief on a small nearby village. It has been observed that ranged weapons work best against him as he can easily disarm you of any weapon or shield if he gets close enough.',
            loot: 'Chainmail',
          },
          {
            bossName: "Shogun Battle",
            level: 23,
            bossImg: 'mob4',
            description: 'Nobu is a shogun threatening the well-being of a rice farm. He handles well against sharp weapons but easily loses his bearings against a strong shield. ',
            loot: 'Knight\'s Armor',
          },
          {
            bossName: "The Act of Joy",
            level: 54,
            bossImg: 'mob5',
            description: 'Joy enjoys taking the joy away by stealing children\'s toys. Teaching him a lesson is easy with blunt weapons. Do note though that wooden shields have no effect against him as he can easily take that away from you. ',
            loot: 'Iron Buckler',
          }
        ];
        details.battles = battles;
        res.render('battle', details);
      }
      else {
        res.render('error', details);
      }
    });
  },

  postChallenge: function(req, res) {
    var username = req.session.username;
    var details = {};
    db.findOne(User, {username: username}, '', function(result) {
      if (result != null) {
        var profpic = result.profpic;
        var title = req.body.title;
        if (title == '')
          title = 'No Title';

        var opponent = req.body.opponent;
        var level = 1;

        var challenge = {
          username: username,
          profpic: profpic,
          title: title,
          content: {
            opponent: opponent,
            level: level,
            loot: 'None'
          },
          comments: [],
          rating: 0
        };
        console.log(challenge);
        db.insertOne(ForumBattle, challenge, function(flag) {
          if (flag) {
            console.log('Added ' + challenge.title);
            //res.redirect('/forum/battle/' + username);
          }
        });
      }
      else {
        res.render('error', details);
      }
    });
  },

  postBattle: function(req, res) {
    var username = req.session.username;
    var details = {};
    db.findOne(User, {username: username}, '', function(result) {
      if (result != null) {
        var profpic = result.profpic;
        var title = req.body.title;
        if (title == '')
          title = 'No Title';

        var opponent = req.body.opponent;
        var level = req.body.level;
        var loot = req.body.loot;

        var battle = {
          username: username,
          profpic: profpic,
          title: title,
          content: {
            opponent: opponent,
            level: level,
            loot: loot
          },
          comments: [],
          rating: 0
        };
        console.log(battle);
        db.insertOne(ForumBattle, battle, function(flag) {
          if (flag) {
            console.log('Added ' + battle.title);
            //res.redirect('/forum/battle/' + username);
          }
        });
      }
      else {
        res.render('error', details);
      }
    });
  }
};

module.exports = battleController;

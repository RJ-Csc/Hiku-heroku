const moment = require('moment');

const mongoose = require('mongoose');

const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const ForumExplore = require('../models/ForumExploreModel.js');
const Task = require('../models/TaskModel.js');

const exploreController = {

  getExplore: function(req, res) {
    var query = {username: req.params.username};

    var projection = 'username charOwned armOwned weapOwned shieldOwned currC currW currA currS';

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

        var location = [
          {
            loc_filename : "ex_thumb_bg",
            loc_title : "Yuchengco Building",
            loc_loot : "UniQlo",
            loc_desc : "Before the ECQ, this building housed the Senior High School of the De La Salle University. It had never been visited by the students of the College of Computer Studies as it is too far away from their own building, Gokongwei.",
            level: 69
          },
          {
            loc_filename : "ex_thumb_bg1",
            loc_title : "Gil Puyat Station",
            loc_loot : "Iron Suit",
            loc_desc : "Commonly mistaken as \"Pedro Gil Station\", Gil Puyat Station is a hotspot for pickpocketers, or colloquially known as \"mandurukot\". Many players use this location in battling each other because of its notoriety. ",
            level: 420
          },

          {
            loc_filename : "ex_thumb_bg2",
            loc_title : "Akihabara",
            loc_loot : "Leather Tunic",
            loc_desc : "Named after Akihiko Matsubara, the creator of Tanti. Because of that Akihabara frequently gets attacked by the Tanti. Explore this location at your own risk! ",
            level: 12629
          },

          {
            loc_filename : "ex_thumb_bg3",
            loc_title : "The Land of Oompa",
            loc_loot : "Wooden Bow",
            loc_desc : "This location has been sequestered by Feene Ishlaighn, and his big red dog, Jay Quearie. Help them defeat the monsters approaching their kingdom. ",
            level: 1212
          },

          {
            loc_filename : "ex_thumb_bg4",
            loc_title : "Shore Top",
            loc_loot : "Ivy Shield",
            loc_desc : "Best location to explore seafood. During high tide, you may need to be at a higher tier to obtain swimming skills. ",
            level: 120
          }
        ]
        details.location = location;
        res.render('explore', details);
      }
      else {
        res.render('error', details);
      }
    });
  },

  postExplore: function(req, res) {
    var username = req.session.username;
    var details = {};
    db.findOne(User, {username: username}, '', function(result) {
      if (result != null) {
        var profpic = result.profpic;
        var title = req.body.title;
        if (title == '')
          title = 'No Title';

        var location = req.body.location;
        var loot = req.body.loot;
        var level = req.body.level;

        var explore = {
          username: username,
          profpic: profpic,
          title: title,
          content: {
            location: location,
            loot: loot,
            level: level
          },
          comments: [],
          rating: 0
        };
        console.log(explore);
        db.insertOne(ForumExplore, explore, function(flag) {
          if (flag) {
            console.log('Added ' + explore.title);
            res.redirect('/forum/explore/' + username);
          }
        });
      }
      else {
        res.render('error', details);
      }
    });
  },
  postTask: function(req, res) {
    var username = req.session.username;
    var details = {};
    db.findOne(User, {username: username}, '', function(result) {
      if (result != null) {
        var taskName = req.body.taskName;
        var lootType = 3;
        var lootIndex = 3;
        var expGain = req.body.expGain;
        var endDate = new Date();

        var task = {
          username: username,
          taskName: taskName,
          lootType: lootType,
          lootIndex: lootIndex,
          expGain: expGain,
          endDate: endDate
        };
        console.log(task);
        db.insertOne(Task, task, function(flag) {
          if (flag) {
            console.log('Added ' + task.taskName);
            res.redirect('/forum/explore/' + username);
          }
        });
      }
      else {
        res.render('error', details);
      }
    });
  },
  getActiveTask: function(req, res) {
    var username = req.query.username;
    db.findOne(Task, {username: username}, '', function(result) {
      console.log(result);
      res.send(result);
    });
  }
}

module.exports = exploreController;

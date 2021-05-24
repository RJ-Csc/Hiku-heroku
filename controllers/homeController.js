const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Task = require('../models/TaskModel.js');

const homeController = {
  getHome: function(req, res) {
    var query = {username: req.params.username};

    var projection = 'username status tier tierProgress profpic task';

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
        details.tier = result.tier;
        details.status = result.status;
        details.tierProgress = result.tierProgress;
        details.profpic = result.profpic;
        details.task = result.task;

        res.render('home', details);
      }
      else {
        res.render('error', details);
      }
    });
  },
  cancelTask: function(req, res) {
    var username = req.body.username;
    console.log('removing task');
    db.deleteOne(Task, {username:username}, (err,result) => {
      if(err) {
        console.error(err);
        res.redirect("/home/"+username);
      }
      else{
        console.log(':)');
        res.redirect("/home/"+username);
      }
    });
  }
}

module.exports = homeController;

const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const registerController = {

  getRegister: function(req, res) {
    var details = {};

    if (req.session.username) {
      details.flag = true;
      details.username = req.session.username;
    }
    else {
      details.flag = false;
    }
    res.render('register', details);
  },

  postRegister: function(req, res) {
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      errors = errors.errors;

      var details = {};

      if (req.session.username) {
        details.flag = true;
        details.username = req.session.username;
      }
      else {
        details.flag = false;
      }

      for (var i = 0; i < errors.length; i++)
        details[errors[i].param + 'Error'] = errors[i].msg;

      res.render('register', details);
    }
    else {
      var username = req.body.username;
      var password = req.body.password;

      var img_index = parseInt(req.body.img_index);

      bcrypt.hash(password, saltRounds, function(err, hash) {
        var user = {
          username: username,
          password: hash,
          status: 'You do not have a bio yet.',
          tier: 0,
          tierProgress: 1,
          profpic: img_index,
          charOwned: [0,1],
          armOwned: [0,1],
          weapOwned: [0,2],
          shieldOwned: [0,3],
          currW: 0,
          currS: 0,
          currA: 0,
          currC: 0,
          currAtt: 0,
          currDef: 0,
          currHp: 0
        }
        db.insertOne(User, user, function(flag) {
          console.log(flag);
          if (flag) {
            res.redirect('/login');
          }
        });
      });
    }
  },

  getCheckUsername: function(req, res) {
    var username = req.query.username;

    db.findOne(User, {username: username}, 'username', function (result) {
      res.send(result);
    });
  }
}

module.exports = registerController;

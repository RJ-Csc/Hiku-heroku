const bcrypt = require('bcrypt');

const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const loginController = {

  getLogIn: function(req, res) {
    if (req.session.username) {
      res.redirect('/home/' + req.session.username);
    }
    else {
      var details = {
        flag: false
      };
      res.render('login', details);
    }
  },
  postLogIn: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    db.findOne(User, {username: username}, '', function(result) {
      if (result) {
        var user = {
          username: result.username,
          password: result.password,
        };

        bcrypt.compare(password, result.password, function(err, equal) {
          if (equal) {
            req.session.username = user.username;

            res.redirect('/home/' + user.username);
          }
          else {
            var details = {
              flag: false,
              error: 'Incorrect details.'
            };
            console.log('unsuccessful login 1');
            res.render('login', details);
          }
        });
      }
      else {

        var details = {
          flag: false,
          error: 'Incorrect details.'
        };
        console.log('unsuccessful login 2');
        res.render('login', details);
      }
    });
  }
}

module.exports = loginController;

const controller = {

  getFavicon: function(req, res) {
    res.status(204);
  },

  getIndex: function(req, res) {
    if (req.session.idNum) {
      res.redirect('/home/' + req.session.username);
    }
    else {
      var details = {
        flag: false
      };

      res.render('index', details);
    }
  }
}

module.exports = controller;

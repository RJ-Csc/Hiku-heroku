const successController = {

  getSuccess: function(req, res) {
    var details = {
      username: req.query.username
    };

    if (req.session.username) {
      details.flag = true;
      details.username = req.session.username;
    }
    else {
      details.flag = false;
    }

    //res.render('success', details);
    res.redirect('/login');
  }
}

module.exports = successController;

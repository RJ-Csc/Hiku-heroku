const logoutController = {
  getLogOut: function(req, res) {
    req.session.destroy(function(err) {
      if(err) throw err;

      res.redirect('/');
    });
  }
}

module.exports = logoutController;

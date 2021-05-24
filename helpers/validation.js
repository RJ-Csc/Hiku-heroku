const { check } = require('express-validator');

const validation = {
  registerValidation: function () {
    var validation = [
      check('username', 'prob with username').notEmpty(),
      check('password', 'prob with password').notEmpty()
    ];

    return validation;
  }
}

module.exports = validation;

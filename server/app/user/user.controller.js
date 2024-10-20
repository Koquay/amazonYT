const userService = require('./user.service');

exports.signup = (req, res) => {
    userService.signup(req, res);
}

exports.signin = (req, res) => {
    userService.signin(req, res);
}
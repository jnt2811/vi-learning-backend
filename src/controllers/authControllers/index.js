const login = require("./loginController.js");
const signup = require("./signupController");
const token = require("./tokenController");
const logout = require("./logoutController");

module.exports = { login, signup, token, logout };

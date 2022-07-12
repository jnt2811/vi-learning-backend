const jwt = require("jsonwebtoken");

const getAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: `${process.env.EXPIRES_IN}`,
  });
};

const getRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = { getAccessToken, getRefreshToken };

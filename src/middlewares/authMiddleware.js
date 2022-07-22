const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const constants = require('../common/constants')
const { TABLE_NAME } = require("../config/table_names");
const common = require("../common/common_function");

module.exports = {
  createTokens: async (user) => {
    const createToken = jwt.sign(
        {
          user: _.pick(user, ['ID', 'role']),
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: constants.TOKEN_EXPIRES_TIME,
        },
    );

    const createRefreshToken = jwt.sign(
        {
          user: _.pick(user, 'ID'),
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: constants.REFRESH_TOKEN_EXPIRES_TIME,
        },
    );

    return [createToken, createRefreshToken];
  },

  refreshTokens : async (refreshToken) => {
    let userId = '';

    try {
      let payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      if(!payload){
        throw {error_code: constants.ERROR_CODE_INVALID, message: "Invalid Token"}
      }
        throw {error_code: constants.ERROR_CODE_INVALID, message: "Invalid Token"}

      if (!payload.user) {
        throw {error_code: constants.ERROR_CODE_INVALID, message: "Invalid Token"}
      }

      userId = payload.user.ID

      let sql = `
                select count(*) as total
                from ${TABLE_NAME.USER}
                where ID = '${userId}'
            `


      let [result,] = await common.query(sql)

      if(!result[0].total){
        throw {error_code: constants.ERROR_CODE_INVALID, message: "Invalid Token"}
      }

      return jwt.sign(
          {
            user: {ID: userId},
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: constants.TOKEN_EXPIRES_TIME,
          },
      );

    } catch (err) {
      throw err
    }
  },

  verifyToken: async (token) => {
    token = token.split(' ')[1];
    try {

      let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      // console.log(payload)
      if(!payload){
        throw {error_code: constants.ERROR_CODE_INVALID, message: "Invalid Token"}
      }

      if (!payload.user) {
        throw {error_code: constants.ERROR_CODE_INVALID, message: "Invalid Token"}
      }

      return payload.user
    } catch (err) {
      if(!err.error_code){
        err.error_code = constants.ERROR_CODE_TOKEN_EXPIRED
      }
      throw err
    }
  }
}
const { verifyToken } = require("../middlewares/authMiddleware");
const constants = require("../common/constants")

module.exports = async function (req, res, next) {
  let token = (req.body && req.body.authorization) || (req.query && req.query.authorization) || req.headers["authorization"] || "";

  if (!token) {
    res.status(403).json({error_code: constants.ERROR_CODE_INVALID, message: "Invalid Token"});
  } else {
    try {
      req.headers.userId = await verifyToken(token);
      next();
    } catch (error) {
      next(error)
    }
  }
};

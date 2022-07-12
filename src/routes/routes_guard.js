import { verifyToken } from "../middlewares/auth";

module.exports = async function (req, res, next) {
  let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers["x-access-token"] || "";

  if (!token) {
    res.status(403).json("Invalid Token");
  } else {
    try {
      req.headers.userId = await verifyToken(token);
      next();
    } catch (error) {
      if (error.status) {
        res.status(error.status).json(error);
      } else {
        res.status(401).json(error);
      }
    }
  }
};

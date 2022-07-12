const db = require("../../config/db_conn");
const { getAccessToken, getRefreshToken } = require("../../helpers");
const { v4: uuidv4 } = require("uuid");

const signupController = (req, res, refreshTokens) => {
  const id = uuidv4();
  const { name, email, password } = req.body;

  const sqlInsert = "insert into user (id, name, email, password) values (?,?,?,?)";

  db.query(sqlInsert, [id, name, email, password], (error, result) => {
    if (error) {
      if (error.errno === 1062) return res.json({ status: false, code: "003" }); // email da ton tai
      return res.status(502).json(error);
    }

    const sqlGetUser = "select * from user where id = ?";

    db.query(sqlGetUser, [id], (error, result) => {
      if (error) return res.status(502).json(error);

      const user = result[0];
      delete user.password;

      const accessToken = getAccessToken({
        id: user.id,
      });
      const refreshToken = getRefreshToken({
        id: user.id,
      });

      refreshTokens.push(refreshToken);

      res.json({
        access_token: accessToken,
        refresh_token: refreshToken,
        user_data: user,
      });
    });
  });
};

module.exports = signupController;

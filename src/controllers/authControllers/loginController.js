const db = require("../../database");
const { getAccessToken, getRefreshToken } = require("../../helpers");

const loginController = (req, res, refreshTokens) => {
  const { email, password } = req.body;

  const sqlCheckEmail = "select * from user where email = ?";

  db.query(sqlCheckEmail, [email], (error, result) => {
    if (error) return res.status(502).json(error);

    if (result.length === 0)
      return res.json({
        status: false,
        errorCode: "001", // tai khoan khong ton tai
      });

    const user = result[0];

    if (user.password !== password)
      return res.json({
        status: false,
        errorCode: "002", // mat khau khong chinh xac
      });

    delete user.password;

    const accessToken = getAccessToken({ id: user.id });
    const refreshToken = getRefreshToken({ id: user.id });

    refreshTokens.push(refreshToken);

    res.json({
      access_token: accessToken,
      refresh_token: refreshToken,
      user_data: user,
    });
  });
};

module.exports = loginController;

const { getAccessToken } = require("../../helpers");
const jwt = require("jsonwebtoken");

const tokenController = (req, res, refreshTokens) => {
  const { token } = req.body;

  if (token === null || !refreshTokens.includes(token)) {
    return res.json({ status: false, code: "004" }); // token khong ton tai
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = getAccessToken({ id: user.id });
    res.json({ status: true, data: { access_token: accessToken } });
  });
};

module.exports = tokenController;

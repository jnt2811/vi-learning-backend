const logoutController = (req, res, refreshTokens) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  return res.sendStatus(204);
};

module.exports = logoutController;

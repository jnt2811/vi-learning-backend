const authRoutes = require("./authRoutes");
// const userRoutes = require("./userRoutes");
// const testRoutes = require("./testRoutes");
// const courseRoutes = require("./courseRoutes");

const routes = (app) => {
  app.use("/auth", authRoutes);
  // app.use(paths.user, userRoutes);
  // app.use(paths.test, testRoutes);
  // app.use(paths.course, courseRoutes);
};

module.exports = routes;

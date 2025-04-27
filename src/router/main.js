const userRouter = require("./user");
const Users = require("../app/models/Users");
function Router(app) {
  app.use("/user", userRouter);
}
module.exports = Router;

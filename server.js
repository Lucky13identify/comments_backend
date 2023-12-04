// eslint-disable-next-line no-unused-expressions
require("dotenv").config;

const app = require("./app");
const eventEmitter = require("./helpers/eventEmitter");

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);

  eventEmitter.on("commentPosted", (data) => {
    console.log("New comment has been published:", data);
  });
});

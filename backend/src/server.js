require("dotenv").config();
const app = require("./app");

app.listen(3001, () => {
  console.log("🚀 Server running on port 3001");
});

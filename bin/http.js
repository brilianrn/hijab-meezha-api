const app = require("../app");
const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV;

app.listen(port, () => {
  console.log(`hijab meezha api is running on port ${port}`);
  console.log(`hijab meezha api is running on ${env} environment`);
});

const app = require('../app.ts');
const port = process.env.PORT || 4000;

app.listen(port, function () {
  console.log(`this app is running on port ${port}`);
});

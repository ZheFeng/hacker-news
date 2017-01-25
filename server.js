// @flow
const express = require('express');

const app = express();

app.use('/static', express.static('static'));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/static/index.server.html`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

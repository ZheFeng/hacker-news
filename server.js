// @flow
const express = require('express');

const app = express();

app.use('/static', express.static('static'));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/static/index.html`);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mockData = require('../mockdata.js')
const db = require('../db/index.js');
const path = require('path')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/../dist')));

app.post('/insert', (req, res) => {
  let payload = req.body;
  console.log('made it to request');
  const postCB = (err, data) => {
    if (err) { console.log(err, 'error in insert')}
    else { res.send(data) }
  }
  db.insert(payload, postCB);
})

const navPort = 3001;
app.listen(navPort, () => {
  console.log(`Nav server awaits instructions on ${navPort}`);
});
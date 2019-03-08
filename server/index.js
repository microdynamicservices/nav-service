require('newrelic');
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('../db/pg.js');

const app = express();
app.use(cors());

app.use('/', express.static(path.join(__dirname, '/../dist')));

// app.get('/seed', (req, res) => {
//   // db.seedHeader();
//   db.seedAdventures();
//   res.send('seeding!')
// })

let random = () => {
  return Math.ceil(Math.random() * (10000 - 9000) + 9000);
}

let populateRequest = () => {
  let categoryIds = [];
  for (let n = 0; n < 10; n++) {
    categoryIds.push(random())
  };
  return categoryIds;
}
let ids = populateRequest();

app.get('/headers', async (req, res) => {
  //let ids = populateRequest();
  try {
    let data = await db.findHeaders(ids);
    res.send(data)
    //res.send(data);
  } catch (error) {
    console.log('caught', error.message);
  }
})

app.get('/adventures', async (req, res) => {
  try {
    let data = await db.findAdventures(ids);
    res.send(data);
  } catch (error) {
    console.log('caught', error.message);
  }
})

app.post('/populate', (req, res) => {
  let payload = req.body;
  // console.log(payload) 
  console.log('made it to request');
  const postCB = (err, data) => {
    if (err) { console.log(err, 'error in insert')}
    else { res.send(data) }
  }
  // db.findMissing(postCB);
  db.insertAdventures(payload.events, (err, data) => {
    if (err) { console.log(err) }
    else db.insertHeaders(payload.headers, postCB)
  });
})


const navPort = 3001;
app.listen(navPort, () => {
  console.log(`Nav server awaits instructions on ${navPort}`);
});
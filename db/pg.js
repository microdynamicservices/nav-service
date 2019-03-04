require('dotenv').config('../.env')
const pg = require('pg')

const knex = require('knex')({
  client: 'pg',
  version: '11.1',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  }
});

//Inserts new headers. Assumes an array.
const insertHeaders = (headers, callback) => {
  //headers should be an array like this:
  //[{id: 1, category:'blahblahblah'}, {id: 2, category:'ahahaha'}]
  //knex('coords').insert([{x: 20}, {y: 30},  {x: 10, y: 20}])
  knex('header').insert(headers)
  .then(() => callback(null, 'Successfully inserted headers'))
  .catch((err) => console.log('there was an error inserting headers', err))
};

//Inserts new Adventures. Assumes an array.
const insertAdventures = (adventures, callback) => {
  //adventures should be an array like this:
  //[{id: 1, title:'blahblahXTREME', categoryid:3434}, {id: 2, title:'WAHHHHAXTREME', categoryid: 5988}]
  //knex('coords').insert([{x: 20}, {y: 30},  {x: 10, y: 20}])
    adventures.forEach((adventure, ind) => {
      let adventureRecord = knex('adventure').insert(adventure)
      callback(null, `Clean insert of entire array.`)
};

//Finds all adventures and returns their id and title
const findAdventures = (callback) => {
  Adventure.find({}).select('id title catagory image_URL -_id').exec((err, data) => { // sic.
    if (err) callback(err, null)
    else callback(null, data)
  })
};

//Finds all headers and returns their id, their catagory (sic), and title.
const findHeaders = (callback) => {
  Header.find({}).select('id catagory -_id').exec((err, data) => { // sic.
    if (err) callback(err, null)
    else callback(null, data)
  })
};


//Finds if anything we're expecting to be in the DB is not, in fact, in the DB.
const findMissing = (callback) => {
  for (let i = 10; i < 101; i++) { 
    Adventure.findOne( { id: `${i}` } ).exec((err, data) => {
      if (err) { callback(err, null) }
      else if (data === null) { console.log('MISSING AT', i) }
      else { console.log('found', data.id) }
    })
  }
};

module.exports.insertAdventures = insertAdventures;
module.exports.insertHeaders = insertHeaders;

module.exports.findAdventures = findAdventures;
module.exports.findHeaders = findHeaders;
module.exports.findMissing = findMissing;
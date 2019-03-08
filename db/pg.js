const path = require('path');
require('dotenv').config(path.join(__dirname, "../.env"));
const pg = require('pg')


var knex = require('knex')({
  client: 'postgresql',
  connection: process.env.PG_CONNECTION_STRING,
});
// const knex = require('knex')({
//   client: 'pg',
//   version: '11.1',
//   connection: {
//     host : process.env.PG_HOST,
//     user : process.env.PG_USER,
//     password : process.env.PG_PASSWORD,
//     database : process.env.PG_NAME
//   }
// });

//Inserts new headers. Assumes an array.
const insertHeaders = (headers) => {
  //headers should be an array like this:
  //[{id: 1, category:'blahblahblah'}, {id: 2, category:'ahahaha'}]
  //knex('coords').insert([{x: 20}, {y: 30},  {x: 10, y: 20}])
  knex('header').insert(headers)
  .then(() => console.log('Successfully inserted headers'))
  .catch((err) => console.log('there was an error inserting headers', err))
};

//Inserts new Adventures. Assumes an array.
const insertAdventures = (adventures) => {
  //adventures should be an array like this:
  //[{id: 1, title:'blahblahXTREME', categoryid:3434}, {id: 2, title:'WAHHHHAXTREME', categoryid: 5988}]
  //knex('coords').insert([{x: 20}, {y: 30},  {x: 10, y: 20}])
  adventures.forEach((adventure, ind) => {
    let adventureRecord = knex('adventure').insert(adventures)
    .then(() => console.log(`Clean insert of entire array.`))
    .catch((err) => console.log('error inserting adventures', err))
  })
}


//Finds all adventures and returns their id and title
const findAdventures = async(adventure) => {
  try {
    let result = await knex.select('id', 'title', 'categoryid')
    .from('adventure')
    .whereIn('categoryid', adventure)
      return result;
  } catch (error) {
    console.log('caught', error.message);
  }
};

//Finds all headers and returns their id, their category, and title.
const findHeaders = async(headers) => {
  try {
    let result = await knex.select('id', 'category')
    .from('header')
    .whereIn('id', headers);
    return result;               
  } catch (error) {
    console.log('caught', error.message);
  }
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
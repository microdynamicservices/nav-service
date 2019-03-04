require('dotenv').config('../.env')
const pg = require('pg')
const faker = require('faker')
const path = require('path')
const knexConfig = require('./knexfile.js')
const ObjectsToCsv = require('objects-to-csv');

const knex = require('knex')({
  client: 'postgresql',
  connection: 'postgres:laura:sdc022019@localhost:5432/adventures',
})

// ({
//   client: 'pg',
//   version: '11.1',
//   connection: {
//     host : process.env.DB_HOST,
//     user : process.env.DB_USER,
//     password : process.env.DB_PASSWORD,
//     database : process.env.DB_NAME
//   }
// });


let random = () => {
  return Math.ceil(Math.random() * 10000);
}


const csvHeaders = async function() {
  const fakeHeaders = [];
  const number = 10000;
  for (let i = 0; i < number; i++) {
    fakeHeaders.push(  {
      id: i + 1,
      category: faker.company.bs()
    });
  }

  let csvHead = new ObjectsToCsv(fakeHeaders)
  
  try {
    await csvHead.toDisk('./headers.csv');
  } catch (error) {
    console.log('caught', error.message);
  }

  
}


const csvAdventures = async function(number) {
  let fakeAdventure = [];
  for (let i = 0; i < 50000; i++) {
    fakeAdventure.push(  {
      id: number + i + 1,
      title: faker.random.words(),
      categoryId: random()
      });
  }

  let csvAdv = new ObjectsToCsv(fakeAdventure)
  
  try {
    await csvAdv.toDisk('./adventure.csv', { append: true });
  } catch (error) {
    console.log('caught', error.message);
  }
};

const seedAdventures = async () => {
  console.time('Generate Csv');
  let n = 0
  while(n < 10000000) {
    try {
      await csvAdventures(n);
    } catch (error) {
      console.log('caught', error.message);
    }
    n += 50000;
  }
  console.timeEnd('Generate Csv');
}
seedAdventures()
// csvHeaders()



module.exports = {
  seedAdventures,
  csvHeaders
}
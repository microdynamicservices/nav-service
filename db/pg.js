require('dotenv').config('../.env')
const pg = require('pg')
const faker = require('faker')

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

//to seed do something like:
//title: faker.random.words()
//category: faker.company.bs()
//imageUrl: faker.image.imageUrl()
//description: faker.lorem.paragraphs()
//price: faker.finance.amount()

// insert — .insert(data, [returning])
// Creates an insert query, taking either a hash of properties to be inserted into the row, or an array of inserts,
// add this to make 10M 10000000

const seed = () => {
  for (let i = 0; i < 10; i++) {
    let title = faker.random.words();
    let category = faker.company.bs();
    let imageUrl = faker.image.imageUrl();
    let description = faker.lorem.paragraphs();
    let price = faker.finance.amount();

    //seed header with 10K and then expand the other x1000 ?
    //adventures will be our 10M datapoint
      //many adventures to single category
      //many pictures to single adventure
    //variation in data

    knex.insert({category: category, image_url: imageUrl}).into('header')
    .then(() => {
      console.log('successfully inserted into header')
      return knex.insert({title: title, category: category, image_url: imageUrl, description: description, price: price}).into('adventure')
      .then(() => console.log('successfully inserted into adventure'))
      .catch((err) => console.log('error seeding adventure: ', err));
    })
    .catch((err) => console.log('error seeding header: ', err));
    
  }
  console.log('successfully seeded database!')
}

// CREATE TABLE header (
//   ID serial PRIMARY KEY,
//   CATEGORY VARCHAR(80) UNIQUE NOT null,
//   IMAGE_URL TEXT
// );


// CREATE TABLE adventure (
//   ID serial PRIMARY KEY,
//   TITLE VARCHAR (80) UNIQUE NOT NULL,
//   CATEGORY_ID INTEGER REFERENCES header(id),
//   IMAGE_URL TEXT,
//   DESCRIPTION TEXT,
//   PRICE decimal NOT NULL
// );

module.exports = {
  seed
}
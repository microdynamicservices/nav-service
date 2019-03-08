const faker = require('faker')

const createFakeHeader = () =>({
  category: faker.company.bs()
})

exports.seed = async function(knex, Promise) {
  const fakeHeaders = [];
  const number = 1000;
  for (let i = 0; i < number; i++) {
    fakeHeaders.push(createFakeHeader());
  }

  await knex('header')
  .insert(fakeHeaders)
};

const faker = require('faker')

var random = () => {
  return Math.floor(Math.random() * 1000);
}

const createFakeAdventure = () =>(
  {
  title: faker.random.words(),
  categoryId: random()
  }
)

exports.seed = async function(knex, Promise) {
  let fakeAdventure = [];
  let number = 1000;
  for (let i = 0; i < number; i++) {
    fakeAdventure.push(createFakeAdventure());
  }


  await knex('adventure')
  .insert(fakeAdventure)
};

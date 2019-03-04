const faker = require('faker')
const ObjectsToCsv = require('objects-to-csv');

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
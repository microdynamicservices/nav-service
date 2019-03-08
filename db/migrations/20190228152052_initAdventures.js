exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('adventure'),
    knex.schema.dropTableIfExists('header'),
    knex.schema.createTable('header', t => {
    t.increments('id');
    t.string('category');
  }),
  knex.schema.createTable('adventure', t => {
    t.increments('id');
    t.string('title');
    t.integer('categoryid');
  })
])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('adventure'),
    knex.schema.dropTableIfExists('header')
  ])
};

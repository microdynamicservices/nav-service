const path = require('path');
require('dotenv').config(path.join(__dirname, "../.env"));
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(process.env.DB_URI);

const adventureSchema = new Schema({
  id: Number,
  title: String,
  catagory: String, // sic.
  image_URL: String,
  description: String,
  price: Number
});

const headerSchema = new Schema({
  id: Number,
  catagory: String, // sic.
  image_URL: String
});

const Adventure = mongoose.model('Adventure', adventureSchema);
const Header = mongoose.model('Header', headerSchema);

//Inserts new headers. Assumes an array.
const insertHeaders = (headers, callback) => {
  Header.insertMany(headers, (err, data) => {
    if (err) { callback(err, null) }
    else { callback(null, 'Successfully inserted headers') }
  })
};

//Inserts new Adventures. Assumes an array.
const insertAdventures = (adventures, callback) => {
    adventures.forEach((adventure, ind) => {
      let adventureRecord = new Adventure(adventure);
      adventureRecord.save()
        .then(() => console.log('success', ind))
        .catch(() => callback(err, null))
      })
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
require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let URI = process.env.DB_URI;
mongoose.connect(URI);

const mockSchema = new Schema({
  id: Number,
  title: String,
  category: String,
  image_URL: String,
  description: String,
  price: Number
})

const Photo = mongoose.model('Photo', mockSchema);

const insert = (adventures, callback) => {
  if (Array.isArray(adventures)) {
    adventures.forEach((adventure, ind) => {
      let adventureRecord = new Photo(adventure);
      adventureRecord.save((err) => { 
        if (err) { callback(err, null) } 
        else if (ind === adventures.length -1) { callback(null, 'Clean insert.') } 
      })
    })
  }
  else if (typeof(adventures) === 'object') {
    let adventureRecord = new Photo(adventures);
   adventureRecord.save((err) => { 
     if (err) { return err } 
     else { console.log('Clean insert.') } })
  }
  else console.log('Please use an object or an array of objects for insertion. You used' + adventures)
}

module.exports.insert = insert;
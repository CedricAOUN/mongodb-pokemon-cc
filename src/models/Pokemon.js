const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
  name: String,
  hp: Number,
  cp: Number,
  picture: String,
  types: [String],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
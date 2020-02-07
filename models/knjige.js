const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const knjigaShema = new Schema({
  
  ime: String,
  pisac: String,
  cena: String,
  slika: String,
},{
  collection:'Knjige'
});

module.exports = mongoose.model("Knjige",knjigaShema,"Knjige");

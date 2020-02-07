const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const narucenoShema = new Schema({
  broj:String,
  ime: String,
  adresa: String,
  adresa2: String,
  grad: String,
  drzava: String,
  postanskibr: String,
  imeknjige: String
},{
  collection:'Naruceno'
});

module.exports = mongoose.model("Naruceno",narucenoShema,"Naruceno");

const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Knjige = require("../models/knjige");
const Narudzbina = require("../models/naruci");
const monguse = require("mongoose");
const urlParser = require("body-parser");

router.use(urlParser.urlencoded({
  extended: true
}));


monguse.connect(
  config.get("Customer.dbConfig").dbAddress,
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log("Error connect to database " + err);
    } else {
      console.log("Connected to mongodb");
    }
  }
);

router.get('/', (req, res) => {
  Knjige.find().exec(function(err,knjiga){
    if(err){
      console.log(err);
    }
    else{
      console.log(knjiga);
      res.render('index',{knjiga:knjiga});
    }
  });
});

router.get('/naruci/:ime',(req,res)=>{
  Knjige.findOne({ime:req.params.ime}).exec(function(err,knjiga){
    if(err){
      console.log(err);
    }
    else{
      console.log(knjiga);
      res.render('naruci',{knjiga:knjiga});
    }
  });
});

router.post('/naruciknjigu/:ime',(req,res)=>{
  var imeKnjige= req.params.ime;
  console.log(imeKnjige);
  var item = {
    broj:req.body.brTelefona,
    ime:req.body.imeIprezime,
    adresa: req.body.adresa,
    adresa2:req.body.adresa2,
    grad:req.body.grad,
    drzava:req.body.drzava,
    pb: req.body.zip,
    imeknjige:req.params.ime
  };

  let narudzbina = new Narudzbina(item);
  narudzbina.save((err, narudzbina) => {
    if (err) {
      console.log(err);
    } else {
      console.log(narudzbina);
      res.redirect('/api/');
    }
  });

});


module.exports = router;

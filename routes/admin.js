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


router.get('/', (req, res) => {
    Narudzbina.find().exec(function (err, narudzbine) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(narudzbine);
            res.render('adminpanel', { narudzbine: narudzbine });
        }
    });
});

router.post('/:id', (req, res) => {
    let pitanjeBrisanje = req.params.id;
    console.log(pitanjeBrisanje);
    Narudzbina.findByIdAndDelete(pitanjeBrisanje, (err, response) => {
        if (err) {
            console.log(err);
        } else {
            Narudzbina.find().exec(function (err, narudzbine) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(narudzbine);
                    res.render('adminpanel', { narudzbine: narudzbine });
                }
            });
        }
    });
});

router.get('/novaknjiga', (req, res) => {
    res.render('novaknjiga');
});


router.post('/',(req,res)=>{
    var item ={
        ime:req.body.ime,
        pisac:req.body.pisac,
        cena:req.body.cena,
        slika: req.body.link
    };
    console.log(item);
    let novaknjiga = new Knjige(item);
    novaknjiga.save((err, nk) => {
        if (err) {
          console.log(err);
        } else {
          console.log(nk);
          res.redirect('/admin/');
        }
      });
})


module.exports = router;

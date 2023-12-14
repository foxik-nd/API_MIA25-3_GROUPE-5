const express = require('express');
const router = express.Router();
const db = require('../config/database');


router.get('/', (req,res) => {
    res.render('index',{title: 'Products page'});
    res.statue(200).send('Ici c\'est pour les produits')

    const sql = "SELECT * FROM Products"; //voir db

    db.query(sql, (err, results) => {
        if(err) {
            console.log('err pour l\'affichage des produits');
            res.status(500).json({ message : err })
        } else{
            res.status(200).json(results);
        }
    })
})


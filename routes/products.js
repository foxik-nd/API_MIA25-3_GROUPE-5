const express = require('express');
const router = express.Router();
const db = require('../config/database');


router.get('/', (req,res) => {
    res.render('index',{title: 'Products page'});
    res.status(200).send('Ici c\'est pour les produits')

    const sql = "SELECT * FROM products"; 

    db.query(sql, (err, results) => {
        if(err) {
            console.log('err pour l\'affichage des produits');
            res.status(500).json({ message : err })
        } else{
            res.status(200).json(results);
        }
    })
})

/*router.post('/add', (req,res) => {
    const { imdbID, title, year, poster } = req.body;

    const sql = "INSERT INTO Movies(imdbID, title, year, poster) VALUES(?, ?, ?, ?)";

    db.query(sql, [imdbID, title, year, poster], (err, result) => {
        if(err) {
            console.log('err ajoute d\'un film');
            res.status(500).json({ message : err })
        } else{
            res.status(200).json(results);
        }
    })
})*/

module.exports = router;

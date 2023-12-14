const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', (req, res) => {
    const sql = "SELECT * FROM products";

    db.query(sql, (err, results) => {
        if (err) {
            console.log('Erreur lors de l\'affichage des produits');
            res.status(500).json({ message : err })
        } else {
            res.status(200).json(results);
        }
    } )
})

router.get('/:id', (req, res) => {
    const productId = req.params.id;
    const sql = `SELECT * FROM products WHERE id = ${productId}`;

    db.query(sql, (err, results) => {
        if (err) {
            console.log(`Erreur lors de l'affichage du produit avec l'ID ${productId}`);
            res.status(500).json({ message: err });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: `Produit avec l'ID ${productId} non trouvé` });
            } else {
                res.status(200).json(results[0]);
            }
        }
    });
});


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

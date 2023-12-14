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



// L'ajout d'un produit 
router.post('/add', (req, res) => {
    const { title, price, description } = req.body;

    const checkProductQuery = "SELECT * FROM products WHERE title = ?";

    db.query(checkProductQuery, [title], (error, results) => {
        if (error) {
            console.log('Erreur lors de la vérification du produit existant');
            res.status(500).json({ message: checkErr });
        } else {
            // Si le produit n'existe pas, procéder à l'ajout
            if (results.length === 0) {
                const insertProduct = "INSERT INTO products(title, price, description) VALUES (?, ?, ?)";

                db.query(insertProduct, [title, price, description], (errorInsert, results) => {
                    if (errorInsert) {
                        console.log('Erreur lors de l\'ajout d\'un produit');
                        res.status(500).json({ message: errorInsert });
                    } else {
                        res.status(200).json({ message: 'Produit ajouté' });
                    }
                });
            } else {
                res.status(400).json({ message: 'Le produit existe déjà ' });
            }
        }
    });
});


module.exports = router;

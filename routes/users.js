const express = require('express');
const router = express.Router();
const db = require('../config/database');
const validator = require('validator');



const validateData = (req, res, next) => {
    const { name, email,hash} = req.body;

    // if (!name || !email || !hash ) {
    //     return res.status(400).json({ message: 'Veuillez fournir un nom, une adresse e-mail et un mot de passe.' });
    // }

    const verifyName = validator.escape(name);
    if (!validator.isAlphanumeric(verifyName)) {
        return res.status(400).json({ message: 'Le nom  doit être alphanumérique.' });
    }

    const verifyEmail = validator.normalizeEmail(email);
    if (!validator.isEmail(verifyEmail)) {
        return res.status(400).json({ message: 'Veuillez fournir une adresse e-mail valide.' });
    }
    const verifyHash = validator.escape(hash);

    if (!isHashCompliant(verifyHash)) {
           return res.status(400).json({ message: 'Le mot de passe ne respecte pas les consignes de la CNIL.' });
    }

    next();
};
const isHashCompliant = (hash) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(hash);
    const hasLowerCase = /[a-z]/.test(hash);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(hash);

    return (
        hash.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasSpecialChars
    );
};

router.post('/signup', validateData, (req, res) => {
    const { name, email,hash} = req.body;
    const checkUser = 'SELECT * FROM users WHERE name = ? OR email = ?';

    db.query(checkUser, [name, email,hash], (checkErr, results) => {
    
        if (checkErr) {
            console.error('Erreur lors de la vérification de l\'utilisateur existant :', checkErr);
            return res.status(500).json({ message: 'Erreur serveur' });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ message: 'L\'email existe déjà.' });
        }

        //sinon
           const insertUserQuery = 'INSERT INTO users (name, email, hash) VALUES (?, ?, ?)';
           db.query(insertUserQuery, [name, email, hash], (insertError, results) => {
               if (insertError) {
                   console.error('Erreur lors de l\'inscription de l\'utilisateur :', insertError);
                   return res.status(500).json({ message: 'Erreur serveur' });
               }

               res.status(200).json({ message: 'Utilisateur inscrit avec succès.' });
    })
})
})


module.exports = router;

const express = require('express');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use('/products', productsRouter);
app.use('/users', usersRouter);


const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}  

app.use(cors(corsOptions));

app.get('/', (req,res) => {
    res.status(200).send('Bienvenue sur mon API')
})

app.listen('3000', () => {
    console.log("Le serveur écoute le port 3000");
})


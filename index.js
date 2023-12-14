const express = require('express');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const app = express();
var cors = require('cors');

app.use(express.json());
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use(cors(corsOptions));

const corsOptions = (
    origin = '*',
    methods = ['GET','POST','PUT', 'DELETE'],
    allowedHeaders = ['content-Type', 'Autorization']
)

app.listen('3000', () => {
    console.log("Le serveur écoute le port 3000");
})


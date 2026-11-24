const express = require('express');
const app = express();
const port = 5000;
const conn = require('./db/conn.js');
const cors = require('cors');

app.use(express.json());
app.use(cors({Credentials: true, origin: '*'}));

const ProdutoRouter = require('./router/ProdutoRouter.js');
app.use('/Produto', ProdutoRouter);

conn
    .sync()
    .then(() => { app.listen(port)})
    .catch((err) => console.log(err));
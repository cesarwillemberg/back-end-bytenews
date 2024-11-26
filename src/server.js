const express = require('express');
const path = require('node:path');
const fs = require('node:fs');
const session = require('express-session');
const cors = require('cors');

const newsRouter = require('./routes/news-rotes')
const userRotes = require('./routes/user-rotes')

const server = express();


server.use(express.json());
server.use(cors());

server.use('/news', newsRouter);
server.use('/user', userRotes);


const PORT = process.env.PORT || 3000;





server.listen(PORT, () => { console.log(`Servidor iniciado em http://localhost:${PORT}/`)})
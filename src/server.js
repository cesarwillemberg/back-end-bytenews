const express = require('express');
const cors = require('cors');
const newsRouter = require('./routes/news-rotes')


const server = express();

server.use(express.json());
server.use(cors());

server.use('/news', newsRouter);


const PORT = process.env.PORT || 3000;





server.listen(PORT, () => { console.log(`Servidor iniciado em http://localhost:${PORT}/`)})
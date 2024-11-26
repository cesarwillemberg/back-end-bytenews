const express = require('express');
const fs = require('node:fs');
const path = require('node:path');

const newsRouter = express.Router();

const databasePath = path.resolve(__dirname, '../../database.json');


// GET /news
newsRouter.get('/', (req, res) => {
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            console.log('Erro ao ler o arquivo database.json', err);
            res.status(500).json({ error: 'Erro ao acessar os dados das notícias.' });
            return;
        }

        try {
            const news = JSON.parse(data);
            res.status(200).json(news);
        } catch (parseError) {
            console.error('Erro ao processar o JSON:', parseError);
            res.status(500).json({ error: 'Erro ao processar os dados das notícias.' });
        }
    })
})

// GET /news/:id
// newsRouter.get('/:id', (req, res) => {
//     const { id } = req.params;

//     fs.readFile(databasePath, 'utf8', (err, data) => {
//         if (err) {
//             console.error('Erro ao ler o arquivo database.json:', err);
//             res.status(500).json({ error: 'Erro ao acessar os dados das notícias.' });
//             return;
//         }

//         try {
//             const news = JSON.parse(data); 
            
//             const formattedTitle = normalizeString(title);        
//             const newsItem = news.find(item => item.id === parseInt(id, 10) || normalizeString(item.title) === formattedTitle);

//             if (!newsItem) {
//                 res.status(404).json({ error: 'Notícia não encontrada.' });
//                 return;
//             }

//             res.status(200).json(newsItem);
//         } catch (parseError) {
//             console.error('Erro ao processar o JSON:', parseError);
//             res.status(500).json({ error: 'Erro ao processar os dados das notícias.' });
//         }
//     })

// })

// GET /news/title/:title
// newsRouter.get('/title/:title', (req, res) => {
//     const { title } = req.params;

//     fs.readFile(databasePath, 'utf8', (err, data) => {
//         if (err) {
//             console.error('Erro ao ler o arquivo database.json:', err);
//             res.status(500).json({ error: 'Erro ao acessar os dados das notícias.' });
//             return;
//         }

//         try {
//             const news = JSON.parse(data);

//             const formattedTitle = normalizeString(title);
        
//             const newsItem = news.find(item => normalizeString(item.title) === formattedTitle);

//             if (!newsItem) {
//                 res.status(404).json({ error: 'Notícia não encontrada.' });
//                 return;
//             }

//             res.status(200).json(newsItem);
//         } catch (parseError) {
//             console.error('Erro ao processar o JSON:', parseError);
//             res.status(500).json({ error: 'Erro ao processar os dados das notícias.' });
//         }
//     })

// })

// GET /news/:idOrTitle
newsRouter.get('/:idOrTitle', (req, res) => {
    const { idOrTitle } = req.params;

    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo database.json:', err);
            res.status(500).json({ error: 'Erro ao acessar os dados das notícias.' });
            return;
        }

        try {
            const news = JSON.parse(data);

            let newsItem;

            if (!isNaN(idOrTitle)) {
                const id = parseInt(idOrTitle, 10);
                newsItem = news.find(item => item.id === id);
            } else {
                const formattedTitle = normalizeString(idOrTitle);
                newsItem = news.filter(item => normalizeString(item.title) === formattedTitle);
            }

            if (!newsItem) {
                return res.status(404).json({ error: 'Notícia não encontrada.' });
            }

            res.status(200).json(newsItem);
        } catch (parseError) {
            console.error('Erro ao processar o JSON:', parseError);
            res.status(500).json({ error: 'Erro ao processar os dados das notícias.' });
        }
    });
});



function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}


module.exports = newsRouter;
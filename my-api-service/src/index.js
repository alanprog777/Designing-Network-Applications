const express = require('express');
const path = require('path');
const stocksRouter = require('./routes/stocks');
const stocksService = require('./services/stocksService'); 

const app = express();

app.use(express.json());

const dataPath = path.join(__dirname, 'data', 'stocks.json');
stocksService.init(dataPath);

app.use('/stocks', stocksRouter);

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});

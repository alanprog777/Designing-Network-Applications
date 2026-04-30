const stocksService = require('../services/stocksService');

const getAllStocks = (req, res) => {
    const { title } = req.query;
    const stocks = stocksService.findAll(title);
    res.json(stocks);
};

const getStockById = (req, res) => {
    const stock = stocksService.findById(req.params.id);
    if (stock) {
        res.json(stock);
    } else {
        res.status(404).json({ message: 'Запись не найдена' });
    }
};

const createStock = (req, res) => {
    const newStock = stocksService.create(req.body);
    res.status(201).json(newStock);
};

const deleteStock = (req, res) => {
    const deleted = stocksService.delete(req.params.id);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Запись не найдена' });
    }
};

module.exports = {
    getAllStocks,
    getStockById,
    createStock,
    deleteStock
};

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

const updateStock = (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = stocksService.update(id, updatedData);

    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'Запись с таким ID не найдена' });
    }
};

const updateChat = (req, res) => {
    const result = stocksService.deleteUnpopularStocks();

    if (result.success) {
        res.json({ message: `Карточки удалены` });
    } else {
        res.json({ message: "Карточек с количеством участников меньше 10 не найдено" });
    }
};

const deleteLowMembers = (req, res) => {
    const result = stocksService.deleteUnpopular();
    res.json({
        message: `Очистка завершена.`,
    });
};

const cloneStock = (req, res) => {
    const { id } = req.params;
    const clonedStock = stocksService.clone(id);

    if (clonedStock) {
        res.status(201).json(clonedStock);
    } else {
        res.status(404).json({ message: 'Оригинал для клонирования не найден' });
    }
};

module.exports = {
    getAllStocks,
    getStockById,
    createStock,
    deleteStock,
    updateStock,
    deleteLowMembers,
    cloneStock
};

const fileService = require('./fileService');

class StocksService {
    constructor() { this.dataPath = ''; }
    init(path) { this.dataPath = path; }

    findAll(title) {
        const stocks = fileService.readData(this.dataPath);
        return title ? stocks.filter(s => s.title.toLowerCase().includes(title.toLowerCase())) : stocks;
    }

    findById(id) {
        const stocks = fileService.readData(this.dataPath);
        return stocks.find(s => s.id === parseInt(id));
    }

    delete(id) {
        let stocks = fileService.readData(this.dataPath);
        const initialLength = stocks.length;
        stocks = stocks.filter(s => s.id !== parseInt(id));
        fileService.writeData(this.dataPath, stocks);
        return stocks.length !== initialLength;
    }

    create(data) {
        const stocks = fileService.readData(this.dataPath);
        const newStock = {
            id: stocks.length > 0 ? Math.max(...stocks.map(s => s.id)) + 1 : 1,
            ...data
        };
        stocks.push(newStock);
        fileService.writeData(this.dataPath, stocks);
        return newStock;
    }

    deleteUnpopular = () => {
    stocks = stocks.filter(stock => stock.members >= 10);

    return { success: true };
};
}

module.exports = new StocksService();

const fileService = require('./fileService');

class StocksService {
    constructor() {
        this.dataPath = '';
    }

    init(path) {
        this.dataPath = path;
    }

    findAll(title) {
        const stocks = fileService.readData(this.dataPath);
        if (title) {
            return stocks.filter(s => s.title.toLowerCase().includes(title.toLowerCase()));
        }
        return stocks;
    }

    findById(id) {
        const stocks = fileService.readData(this.dataPath);
        return stocks.find(s => s.id === parseInt(id));
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

    delete(id) {
        let stocks = fileService.readData(this.dataPath);
        const initialLength = stocks.length;
        stocks = stocks.filter(s => s.id !== parseInt(id));
        fileService.writeData(this.dataPath, stocks);
        return stocks.length !== initialLength;
    }

    update(id, data) {
        const stocks = fileService.readData(this.dataPath);
        const index = stocks.findIndex(s => s.id === parseInt(id));

        if (index !== -1) {
            stocks[index] = { ...stocks[index], ...data };

            fileService.writeData(this.dataPath, stocks);

            return stocks[index];
        }
        return null;
    }

    deleteUnpopular() {
        const stocks = fileService.readData(this.dataPath);
        const initialCount = stocks.length;
        const filteredStocks = stocks.filter(s => s.members >= 10);

        if (filteredStocks.length !== initialCount) {
            fileService.writeData(this.dataPath, filteredStocks);
        }

        return {
            deleted: initialCount - filteredStocks.length,
            remaining: filteredStocks.length
        };
}
}

module.exports = new StocksService();

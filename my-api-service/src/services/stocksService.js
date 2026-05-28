const fileService = require('./fileService');

class StocksService {
    constructor() { this.dataPath = ''; }

    init(path) {
        this.dataPath = path;
    }

    findAll(title) {
        const stocks = fileService.readData(this.dataPath);
        return title ? stocks.filter(s => s.title.toLowerCase().includes(title.toLowerCase())) : stocks;
    }

    findById(id) {
        const stocks = fileService.readData(this.dataPath);
        return stocks.find(s => s.id === parseInt(id));
    }

    update(id, updatedData) {
        const stocks = fileService.readData(this.dataPath);
        const index = stocks.findIndex(s => s.id === parseInt(id));

        if (index === -1) return null;

        stocks[index] = {
            ...stocks[index],
            ...updatedData,
            id: stocks[index].id
        };

        fileService.writeData(this.dataPath, stocks);
        return stocks[index];
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

    deleteUnpopular() {
        let stocks = fileService.readData(this.dataPath);
        const initialLength = stocks.length;
        stocks = stocks.filter(s => s.members >= 10);
        fileService.writeData(this.dataPath, stocks);
        return { success: true, removedCount: initialLength - stocks.length };
    }

    clone(id) {
        const stocks = fileService.readData(this.dataPath);
        const original = stocks.find(s => s.id === parseInt(id));
        if (!original) return null;

        const clone = { ...original, id: Math.max(...stocks.map(s => s.id)) + 1, title: original.title + ' (Клон)' };
        stocks.push(clone);
        fileService.writeData(this.dataPath, stocks);
        return clone;
    }
}

module.exports = new StocksService();

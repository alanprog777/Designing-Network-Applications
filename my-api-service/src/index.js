const express = require('express');
const path = require('path');
const stocksRouter = require('./routes/stocks');
const stocksService = require('./services/stocksService');

const app = express();
const PORT = 3000;

// Путь к твоему JSON файлу
const DATA_FILE_PATH = path.join(__dirname, 'data', 'stocks.json');

// 1. Инициализируем сервис (даем ему путь к файлу)
stocksService.init(DATA_FILE_PATH);

// 2. Middleware для работы с JSON (чтобы сервер понимал входящие данные)
app.use(express.json());

// 3. Логирование (будем видеть каждый запрос в консоли)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// 4. Подключаем наши маршруты (все будут начинаться с /stocks)
app.use('/stocks', stocksRouter);

// Обработка несуществующих страниц (404)
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// 5. Запуск!
app.listen(PORT, () => {
    console.log(`🚀 Сервер летит на http://localhost:${PORT}`);
});

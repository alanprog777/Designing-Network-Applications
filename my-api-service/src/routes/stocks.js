const express = require('express');
const router = express.Router();
const stocksController = require('../controllers/stocksController');

router.get('/', stocksController.getAllStocks);
router.get('/:id', stocksController.getStockById);
router.post('/', stocksController.createStock);
router.delete('/:id', stocksController.deleteStock);
router.patch('/:id', stocksController.updateStock);
router.delete('/cleanup/unpopular', stocksController.deleteLowMembers);
router.post('/:id/clone', stocksController.cloneStock);

module.exports = router; 

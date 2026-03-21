const express = require('express');
const router = express.Router();
const idController = require('../controllers/IdController');

// Route for updating the IP address (POST)
router.post('/config/set-ip', idController.setIp);

// Route for fetching the current IP address (GET)
router.get('/config/fetch-ip', idController.getIp);

module.exports = router;

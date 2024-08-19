const express = require('express');
const router = express.Router();

// Mock any routes or middleware here if needed
router.get('/some-endpoint', (req, res) => {
    res.status(200).send('Mocked endpoint response');
});

module.exports = router;

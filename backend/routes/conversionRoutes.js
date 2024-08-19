const express = require('express');
const router = express.Router();
const {grade} = require('../grader');

router.post('/grade', (req, res) => {
    const {inputValue, fromUnit, toUnit, studentResponse} = req.body;
    const result = grade(inputValue, fromUnit, toUnit, studentResponse);
    res.json(result);
});

module.exports = router;

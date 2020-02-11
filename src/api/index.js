const express = require('express');
const { Router } = express;
const router = new Router();

const collect = require('./collect');
const metrics = require('./metrics');
const data = require('./data');

router.use('/api/collect', collect);
router.use('/api/metrics', metrics);
router.use('/api/data', data);

module.exports = router;
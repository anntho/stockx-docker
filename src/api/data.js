const { Router } = require('express');
const router = new Router();

const db = require('../persistence/db');
const { logger } = require('../tools/logger');

router.get('/shoes', async (req, res) => {
    try {
        let query = {
            text: 'SELECT * FROM shoes'
        };
        let { rows } = await db.query(query);
        return res
            .status(200)
            .json(rows);
    } catch (err) {
        let error = err.message || err;
        logger.log({
            level: 'error',
            message: error
        });
        return res
            .status(500)
            .json({ error: error });
    }
});

router.get('/fits/:id', async (req, res) => {
    try {
        let shoeId = req.params.id;
        let query = {
            text: 'SELECT * FROM fits WHERE shoeId = $1',
            values: [shoeId]
        };
        let { rows } = await db.query(query);
        if (rows && rows.length) {
            return res.status(200).json(rows);
        } else {
            logger.log({
                level: 'warn',
                message: JSON.stringify(req.params)
            });
            return res
                .status(400)
                .json({ message: `Shoe not found with id [${shoeId}]` })
        }
    } catch (err) {
        let error = err.message || err;
        logger.log({
            level: 'error',
            message: error
        });
        return res
            .status(500)
            .json({ error: error });
    }
});

module.exports = router;
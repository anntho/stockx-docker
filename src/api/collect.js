const { Router } = require('express');
const router = new Router();

const db = require('../persistence/db');
const { logger } = require('../tools/logger');

router.post('/fit', async (req, res) => {
    try {
        if (req.body) {
            let shoeId = req.body.shoeId || null;
            let metric = req.body.metric || null;

            if (metric > 0 && metric <= 5) {
                if (shoeId && metric) {
                    let query = {
                        text: 'INSERT INTO fits (shoeId, fit) values ($1, $2)',
                        values: [shoeId, metric]
                    };
    
                    await db.query(query);
                    return res.sendStatus(200);
                } else {
                    logger.log({
                        level: 'warn',
                        message: JSON.stringify(req.body)
                    });
                    return res
                        .status(400)
                        .json({
                            message: 'Invalid request format or missing data'
                        });
                }
            } else {
                logger.log({
                    level: 'warn',
                    message: JSON.stringify(req.body)
                });
                return res
                    .status(400)
                    .json({
                        message: 'Fit metric outside of acceptable range. Please include a value between 1 and 5.'
                    });
            }
        }
    } catch (err) {
        logger.log({ level: 'error', message: err });
        res.sendStatus(500);
    }
});

module.exports = router;
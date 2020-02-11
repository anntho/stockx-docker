const { Router } = require('express');
const router = new Router();

const db = require('../persistence/db');
const { logger } = require('../tools/logger');

router.get('/true-to-size/:id', async (req, res) => {
    try {
        let shoeId = req.params.id;
        let query = {
            text: `
                SELECT 
                    shoes.id, 
                    shoes.name, 
                    shoes.ticker,
                    AVG (fits.fit) AS tts 
                FROM fits JOIN shoes ON shoes.id = fits.shoeId 
                WHERE shoeId = $1 GROUP BY shoes.id`,
            values: [shoeId]
        };

        const { rows } = await db.query(query);

        if (rows && rows[0] && rows[0].tts) {
            return res
                .status(200)
                .json(rows[0]);
        } else {
            logger.log({
                level: 'warn',
                message: JSON.stringify(req.params)
            });
            return res
                .status(400)
                .json({message: `No data found for id [${shoeId}]`});
        }
    } catch (err) {
        logger.log({
            level: 'error',
            message: err
        });
        res.sendStatus(500);
    }
});

module.exports = router;
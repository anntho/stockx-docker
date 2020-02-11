const appRoot = require('app-root-path');
const winston = require('winston');

const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    }
}

const logger = new winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'stockx-challenge' },
    transports: [
        new winston.transports.File(options.file)
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console(options.console));
}

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
};

module.exports.logger = logger;
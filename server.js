const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
const api = require('./src/api');
const { pageNotFound, internal } = require('./src/tools/errors');
const accessLogStream = fs.createWriteStream('./logs/access.log', { flags: 'a' });

app.get('/', (req, res) => res.sendStatus(200));

app.use(morgan('short', {
    stream: accessLogStream
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());

app.use(api);

app.use(pageNotFound);
app.use(internal);

let server = null;
module.exports = {
    start(port) {
        server = app.listen(port, () => {
            let env = process.env.NODE_ENV || 'development';
            console.log(`Server started in [${env}] on port ${port}`);
        });
        return app;
    },
    stop() {
        server.close();
    }
}

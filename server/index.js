const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('index');
const morgan = require('morgan');

const { favoritesRouter } = require('./src/routers/favoritesRouter');
const { weatherRouter } = require('./src/routers/weatherRouter');

const port = process.env.PORT || 3001;
const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use('/api/favorites', favoritesRouter);
app.use('/api/weather', weatherRouter);

app.listen(port, () => {
    debug(`Listening on port ${chalk.green(port)}`);
});
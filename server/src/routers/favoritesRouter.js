const express = require('express');
const debug = require('debug')('favoritesRouter');
const chalk = require('chalk');
const sql = require('mssql/msnodesqlv8');

const { getWeatherByName } = require('../helpers/weatherGetter');

const config = {
    database: "FavoriteCities",
    server: "DESKTOP-GI8OIE7",
    driver: "msnodesqlv8",
    port: 1433,
    options: {
        trustedConnection: true
    }
};

const favoritesRouter = express.Router();

favoritesRouter.route('/').get((req, res) => {
    sql.connect(config).then(pool => {
        return pool.request().query('SELECT [Name] FROM [dbo].[Cities];')
    }).then(result => {
        const response = [];
        result.recordsets[0].forEach(element => {
            response.push(element.Name);
        });
        res.json(response);
    }).catch(error => {
        debug(chalk.red('Database error'));
        res.status(500).send('Internal server error. Please try later.');
    });
});

favoritesRouter.route('/').post(async (req, res) => {
    let name = req.body.name.trim();
    name = name[0].toUpperCase() + name.slice(1).toLowerCase();
    const result = await getWeatherByName(name);
    if (result.isOk) {
        sql.connect(config).then(pool => {
            return pool.request().query(`INSERT INTO [dbo].[Cities] VALUES ('${name}');`);
        }).then(result => {
            res.status(201).json({ name });
        }).catch(error => {
            res.status(409).send('This city is already in favorites.');
        });
    } else {
        res.status(404).send('Weather for this city is not available.');
    }
});

favoritesRouter.route('/').delete((req, res) => {
    let name = req.body.name.trim();
    name = name[0].toUpperCase() + name.slice(1).toLowerCase();
    sql.connect(config).then(pool => {
        return pool.request().query(`DELETE FROM [dbo].[Cities] WHERE [Name] = '${name}';`);
    }).then(result => {
        if (result.rowsAffected[0] === 0) {
            res.status(409).send('This city is not in favorites.');
        } else {
            res.status(204).end();
        }
    }).catch(error => {
        res.status(409).send('This city is not in favorites.');
    });
});

exports.favoritesRouter = favoritesRouter;
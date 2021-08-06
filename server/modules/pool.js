const pg = require('pg');

const config = {
    database: 'weekend_to_do_app',
} // end config

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('connect to postgres');
}); // end pool.on connect

pool.on("error", (error) => {
    console.log('error connecting to postgres', error);
}); // end pool.on error

module.exports = pool;
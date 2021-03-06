const express = require('express');
const tasksRouter = express.Router();

//establish that database connection
const pool = require('../modules/pool');

//GET 
tasksRouter.get('/', (req, res) => {
    let queryText = `
    SELECT "id", "description", "priority", "status"
    FROM "tasks"
    
    
    `;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
    });

});

//POST // makes query request to database 
tasksRouter.post('/', (req, res) => {
    let newTask = req.body;
    console.log('new task:', newTask);

    let queryText = `
        INSERT INTO "tasks"
            ("description", "priority", "status")
        VALUES
            ($1, $2, $3);
    
    `;
    let sqlParams = [
        newTask.description,
        newTask.priority,
        newTask.status
    ];
    console.log(sqlParams);

    pool.query(queryText, sqlParams)
        .then((dbRes) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error in POST!', error);
            res.sendStatus(500);
        });
});
//PUT // updates task data that enables ternary switch in client logic
tasksRouter.put('/:id', (req, res) => {
    let id = req.params.id
    console.log(`updating task ${id}`);

    let queryText = `
        UPDATE "tasks"
        SET "status" = NOT "status"
        WHERE "id" = $1;
    `;

    params = [ id ];
    pool.query(queryText, params)
        .then((dbRes) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error in PUT!', error);
            res.sendStatus(500);
        });
})

//DELETE
tasksRouter.delete('/:id', (req, res) => {
    let queryText = `
        DELETE FROM "tasks"
        WHERE "id" = $1
    
    `;
    let sqlParams = [
        req.params.id
    ];
    console.log(sqlParams);
    pool.query(queryText, sqlParams)
        .then((dbRes) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error in DELETE!', error);
            res.sendStatus(500);
        });
})

module.exports = tasksRouter;

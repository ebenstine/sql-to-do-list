const { Router } = require('express');
const express = require('express');
const tasksRouter = express.Router();

//establish that database connection
const pool = require('../modules/pool');


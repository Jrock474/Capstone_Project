import pg from 'pg';
import express from 'express';
import winston from 'winston';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
const app = express()
const port = 3000

// const pg = require('pg-promise')();

// const db = pg("postgres://dretaylor@localhost:5432/postgres");

app.get('/', (req, res) => {
    res.send("ayo")
})

app.listen(port, ()=>{
    console.log('Server is running on port 3000');
})


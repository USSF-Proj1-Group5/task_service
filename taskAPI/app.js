const fs = require("fs")
const express = require('express')
const bodyParser = require("body-parser")

const app = express()
const port = 3001

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'admin',
    host: 'database',
    database: 'tasks_db',
    password: 'admin',
    port: 5432,
})

app.use(bodyParser.json())

var tasks = JSON.parse(fs.readFileSync('./tasks.JSON'))

app.get('/test', (req, res) => {
        res.send(tasks)
    
})

app.get('/tasks', (req, res) => {
    pool.query('SELECT * FROM tasks_table', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
})


app.post('/add_task', (req, res) => {
    let result;
    if(req.body.name && req.body.category && req.body.recurrence && req.body.last_serviced){
        pool.query('INSERT INTO tasks_table (name, category, recurrence, last_serviced) VALUES ($1, $2, $3, $4)', 
        [req.body.name, req.body.category, req.body.recurrence, req.body.last_serviced], (error, results) => {
            if (error) {
                throw error;
            }
        })
        result = {
            "status": "success",
            "message": "The task was successfully added"
        }
        res.status(200).send(result)
    } else {
        console.log(req.body.name)
        result = {
            "status": "failed",
            "message": "The task was not added"
        }
        res.status(400).send(result)

    }
})

/*
app.get('/emails/:id', (req, res) => {
    pool.query('SELECT * FROM emails WHERE id = $1', [req.params.id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
})

app.get('/search', (req, res) => {
    let str = '%' + decodeURIComponent(req.query.query) + '%';
    pool.query("SELECT * FROM emails WHERE lower(subject) LIKE lower($1)", [str], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

app.post('/send', function (req, res) {
    let result;
    const emailSender = req.body;
    if (emailSender.sender && emailSender.recipient && emailSender.subject && emailSender.message) {
        pool.query('INSERT INTO emails (sender, recipient, subject, message, date) VALUES ($1, $2, $3, $4, $5)', [emailSender.sender, emailSender.recipient, emailSender.subject, emailSender.message, new Date().toISOString()], (error, results) => {
            if (error) {
                throw error;
            }
        })
        result = {
            "status": "success",
            "message": "The message was successfully sent"
        }
    } else {
        result = {
            "status": "failed",
            "message": "The message was not sent"
        }
        res.status(400);
    }
    res.json(result);
});

*/
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
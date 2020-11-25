const fs = require("fs")
const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')

const app = express()
const port = 3001

app.use(cors())
app.options('*', cors())

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


app.post('/addTask', (req, res) => {
    let result;
    if(req.body.name && req.body.category && req.body.recurrence && req.body.last_serviced){
        
        pool.query('INSERT INTO tasks_table (name, category, recurrence, last_serviced, user_id) VALUES ($1, $2, $3, $4, $5)', 
        [req.body.name, req.body.category, req.body.recurrence, req.body.last_serviced, req.body.user_id], (error, result) => {
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

        result = {
            "status": "failed",
            "message": "The task was not added"
        }
        res.status(400).send(result)

    }
})

app.delete('/deleteTask', (req, res) => {
    let results;
    const id = parseInt(req.body.id);
    // if(id){
        pool.query('DELETE FROM tasks_table WHERE id = $1', [id], (error, results) => {
            if(error){
                throw error
            }
            result = {
                "status": "success",
                "message": "The task was successfully deleted"
            }
            res.status(200).send(results);
        })
    // } else {
    //     res.status(400).send('not deleted')
    // }
})

// app.delete('/deleteTask', (req, res) => {
//     let results;
//     //if(req.body.id){
//         pool.query('DELETE FROM tasks_table WHERE id IN ($1)', [req.body.id], (error, results) => {
//             if(error){
//                 throw error
//             }
//         })
//         result = {
//             "status": "success",
//             "message": "The task was successfully deleted"
//         }
//         res.status(200).send(results);
//     // } else {
//     //     res.status(400).send('not deleted')
//     // }
// })

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
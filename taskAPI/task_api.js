const fs = require("fs")
const bodyParser = require("body-parser")
const express = require('express')
var cookieParser = require('cookie-parser')
const { toNamespacedPath } = require("path")

const app = express()
const port = 2222

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

var movies = JSON.parse(fs.readFileSync('./movies.JSON'))


// YOUR CODE GOES HERE
app.get('/movies', (req, res) => {
    res.send(movies)
    res.sendStatus(200)
})

app.get('/movies/search', (req, res) => {
    let title = req.query.title
    let movie = movies.filter(movie => movie.title === title) // come back to write if part of title is written
    res.send(movie)
})

app.get('/movies/:id', (req, res) => {
    let id = req.params.id;
    let movie = movies.find(movie => movie.movieId === parseInt(id));
    res.send(movie);
})

app.post('/movies', (req, res) => { // add required fields check
    let newMovie = req.body; 
    movies.push(newMovie);
    res.send('Success!')
    //added comment
})

app.delete('/movies/:id', (req, res) => {
    let id = req.params.id;
    let movietoDelete = movies.find(movie => movie.movieId === parseInt(id));
    let newMovieList = movies.filter(movie => movie.movieId !== parseInt(id));
    movietoDelete = movietoDelete.title
    movies = newMovieList;
    res.send('Received a delete request for movie ' + movietoDelete) //need to check required fields
    
})

  app.get('/setcookie', (req, res) => {
    res.cookie('firstName', 'Tom')
    res.cookie('lastName', 'Thorpe')
    res.end();
  })

  app.get('/readcookie', (req, res) => {
        res.send(req.cookies)
  })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

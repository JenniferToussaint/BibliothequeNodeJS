
const express = require('express');
const mongoose = require('mongoose');
const uri = 'mongodb+srv://jennifer:3004@sikara.bjdzhud.mongodb.net/?retryWrites=true&w=majority&appName=sikara';



let promise = mongoose.connect(uri);
const Book = require('./model/book.model');

let app = express ();

promise.then((db) => {
    console.log('Db connected')

app.listen(3001, () => {

    console.log('Listening on port 3001 !');
});
});


app.use('/public', express.static('./client/public'));
app.use('/asset', express.static('./client/asset'));
app.use(require('express').json());

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/client/index.html');
})


app.post('/book', (req, res) =>{

    let newBook = new Book(req.body);

    newBook.save()
    .then(obj => {
        return res.send(obj);
      })
      .catch(error => {

        console.log(error);
        return res.sendStatus(500);
      });
});

app.get('/allBooks', (req, res) => {
    Book
        .find({})
        .sort({ _id: -1 }) // tri pour voir les livres + récents en premier
        .then((obj) => {
            return res.send(obj);
        })
        .catch((err) => {
            console.log('Error', err);
            return res.sendStatus(500);
        });
});

app.get('/top-books', (req, res) => {
    Book
        .find({})
        .sort({ _id: -1 }) // tri pour voir les livres + récents en premier
        .limit(3)
        .then((obj) => {
            return res.send(obj);
        })
        .catch((err) => {
            console.log('Error', err);
            return res.sendStatus(500);
        });
});

app.get('/books/:id', (req, res) => {
    Book.findOne({_id: req.params.id})
    .then((obj) => {
        return res.send(obj);
    })
    .catch((err) => {
        console.log('Error', err);
        return res.sendStatus(500);
    });
    
});

app.put('/books/:id', (req, res) => {
    Book.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators:true})
    .then((obj) => {
        return res.send(obj);
    })
    .catch((err) => {
        console.log('Error:', err);
        return res.sendStatus(500);
    })
})

app.delete('/books/:id', (req, res) => {
    Book.deleteOne({_id: req.params.id})
    .then(() =>{
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('Error', err);
        res.sendStatus(500);
    })
})


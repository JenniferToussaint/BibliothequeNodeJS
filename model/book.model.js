const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
    titre: String,
    genre: String,
    auteur: String,
    nbPages: Number,
    edition: String,
    resume:String,
    urlImage: String,
});

let Book = mongoose.model('Book', bookSchema);

module.exports = Book;
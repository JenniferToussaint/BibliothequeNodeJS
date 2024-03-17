

let titre = document.querySelector('#titre');
let genre = document.querySelector('#genre');
let auteur = document.querySelector('#auteur');
let nbPages = document.querySelector('#nbPages');
let edition = document.querySelector('#edition');
let resume = document.querySelector('#resume');
let urlImage = document.querySelector('#urlImage');

let url = window.location;
let bookId = url.hash.substring(1); // recup l'id dans l'url

// Quand on arrive sur la page
let urlGetBook =`/books/${bookId}`;

let myHeaders = new Headers();
let options = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

fetch(urlGetBook, options)
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
    })
    .then((response) => {
        titre.textContent = response.titre;
        genre.textContent = response.genre;
        auteur.textContent = response.auteur;
        nbPages.textContent = response.nbPages;
        edition.textContent = response.edition;
        resume.textContent = response.resume;
        urlImage.src = response.urlImage;
    })
    .catch((error) => {
        console.log(error);
    })

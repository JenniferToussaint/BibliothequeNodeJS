let btnModify = document.querySelector('#modify');
btnModify.addEventListener('click', (e) => {
    e.preventDefault();
   modify()
});

let titre = document.querySelector('#titre');
let genre = document.querySelector('#genre');
let auteur = document.querySelector('#auteur');
let nbPages = document.querySelector('#nbPages');
let edition = document.querySelector('#edition');
let resume = document.querySelector('#resume');
let urlImage = document.querySelector('#urlImage');


let url = window.location;
let bookId = url.hash.substring(1);

// Quand on arrive sur la page
let urlGetBook =`/books/${bookId}`;

function modify() {
    let tmp = {
        titre: titre.value,
        genre: genre.value,
        auteur: auteur.value,
        nbPages: nbPages.value,
        edition: edition.value,
        resume: resume.value,
        urlImage: urlImage.value
    };

    let options = {
        method: 'PUT',
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(tmp)
    };

    fetch(urlGetBook, options)
        .then((res) => {
            if(res.ok) {
                window.location.href= '/public/listBook.html'
            }
        })
        .catch((error) => {
            console.log('Error : ', error);
        });
}

// Récupère les données du livre
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
        titre.value = response.titre;
        genre.value = response.genre;
        auteur.value = response.auteur;
        nbPages.value = response.nbPages;
        edition.value = response.edition;
        resume.value = response.resume;
        urlImage.value = response.urlImage;
    })

    .catch((error) => {
        console.log(error);
    })

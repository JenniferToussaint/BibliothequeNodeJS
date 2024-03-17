
let btn = document.querySelector('#btnAddBook');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    addBook();
});


function addBook() {
    let titre = document.querySelector('#titre');
    let genre = document.querySelector('#genre');
    let auteur = document.querySelector('#auteur');
    let nbPages = document.querySelector('#nbPages');
    let edition = document.querySelector('#edition');
    let resume = document.querySelector('#resume');
    let urlImage = document.querySelector('#urlImage');

    let body = {
        titre: titre.value,
        genre: genre.value,
        auteur: auteur.value,
        nbPages : nbPages.value,
        edition: edition.value,
        resume: resume.value,
        urlImage: urlImage.value
    };

    let url = '/book';

    let options = {
        method: 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(body)
    };

    fetch(url, options)
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
    })
    .then(() => {
        document.forms['formAjoutBook'].reset();
        window.location.href= '../../public/listBook.html'
    })
    
    .catch((error) => {
        console.log('Error : ', error);
    });
}
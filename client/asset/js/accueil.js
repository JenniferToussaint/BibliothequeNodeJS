// se lance quand on arrive sur la page index.html (accueil)
let myHeaders = new Headers();
let url = '/top-books';
let options = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache : 'default'
};

fetch(url, options)
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
    })
    .then((response) => {
        const container = document.querySelector('.row');

        response.forEach((book) => {

            let col = document.createElement('div');
            col.className = 'col-md-4';

            let card = document.createElement('div');
            card.className = 'card';

            let cardBody = document.createElement('div');
            cardBody.className = 'card-body d-flex flex-column';

            let row = document.createElement('div');
            row.className = 'row p-1 mb-2';

            let leftColumn = document.createElement('div');
            leftColumn.className = 'col-sm-8'; 

            // titre
            let titre = document.createElement('h5');
            titre.className = 'card-title';
            titre.textContent = book.titre;

            // auteur
            let auteur = document.createElement('p');
            auteur.className = 'card-text';
            auteur.textContent = book.auteur;

            // genre
            let genre = document.createElement('p');
            genre.className = 'card-text';
            genre.textContent = book.genre;

            // colonne gauche
            leftColumn.appendChild(titre);
            leftColumn.appendChild(auteur);
            leftColumn.appendChild(genre);

            // colonne droite
            let rightColumn = document.createElement('div');
            rightColumn.className = 'col-sm-4';

            // image
            let image = document.createElement('img');
            image.src = book.urlImage;
            image.className = 'img-fluid';

            rightColumn.appendChild(image);

            row.appendChild(leftColumn);
            row.appendChild(rightColumn);

            cardBody.appendChild(row);

            // lien vers détails
            let link = document.createElement('a');
            link.href = `/public/detailsBook.html#${book._id}`;
            link.className = 'btn btn-outline-info';
            link.textContent = 'Voir en détails';

            cardBody.appendChild(link);
            card.appendChild(cardBody);
            col.appendChild(card);
            container.appendChild(col);
        });
    })
    .catch((err) => {
        console.log('Error :', err);
    })
// Suppresion d'un livre
function deleteBook(id) {
    let url = `/books/${id}`;
    let options = {
        method: 'DELETE',
    };
    fetch(url, options)
    .then((res) => {
        if(res.ok) {
            console.log(res);
            window.location.reload() // Recharge la page en cours, en arrivant sur la page, recharge les livres
        }
    })
    .catch((error) => {
        console.log('Error : ', error);
    });
}

function addOneLine(data) {
    let tab = document.querySelector('#books');
    let newLine = document.createElement('tr');
    for (const prop in data) {
        if(prop != '_id' && prop != '__v') {
            let tmp = document.createElement('td');

            if (prop == "urlImage") {
                let img = document.createElement("img")
                img.src = data[prop]
                img.style="width:80px;"
                tmp.appendChild(img)
            } else {
                tmp.innerText = data[prop];
            }

            newLine.appendChild(tmp);
        }
    }

    // création lien vers la page de détail
    let tdEdit = document.createElement('td');
    let btnEdit = document.createElement('button');
    btnEdit.innerText = 'Edit';
    btnEdit.classList.add('btn', 'btn-outline-warning');

    // ajout la possibilité de clicker sur le bouton edit pour rediriger vers la page d'édition
    btnEdit.addEventListener('click', function() {
        window.location.href = `/public/modifBook.html#${data._id}`;
    });


    tdEdit.appendChild(btnEdit);
    newLine.appendChild(tdEdit);

    // création du bouton de suppression
    let tdSuppr = document.createElement('td');
    let btnSuppr = document.createElement('button');
    btnSuppr.innerText = 'Suppression';
    btnSuppr.classList.add('btn', 'btn-outline-danger');
    tdSuppr.appendChild(btnSuppr);
    newLine.appendChild(tdSuppr);

    // ajout la possibilité de clicker sur le bouton suppr en appelant la méthode deleteBook
    btnSuppr.addEventListener('click', () => {
        deleteBook(data._id);
    });

    tab.appendChild(newLine);
}


// se lance quand on arrive sur la page listBook.html
let myHeaders = new Headers();
let url = '/allBooks';
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
        response.forEach((elt) => {
            // ajoute ligne par une ligne dans le tableau
            addOneLine(elt);
        });
    })
    .catch((err) => {
        console.log('Error :', err);
    })
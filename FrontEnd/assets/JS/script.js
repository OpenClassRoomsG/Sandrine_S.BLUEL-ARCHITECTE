 
//----------------------------------------//
//      Affichage dynamique des Works     //
//--------------------------------------- //
const gallery = document.querySelector('.gallery'); // Emplacement des Works //
const filters = document.querySelector('.filters'); // Emplacement des filtres //
const modalButton = document.querySelector ('.bouton2'); // Emplacement du button //
const logoutButton = document.querySelector('#logout'); // Emplacement du button logout //

let works = [];
let categories = [];
const token = sessionStorage.getItem('token');

console.log(token)

// Envoi Requête pour API et accès tableau Works  //    
 async function getWorks() { 
        const response = await fetch("http://localhost:5678/api/works"); // Attendre que le fichier soit généré //
        const data = await response.json() ;// Convertir en .json//
        works = data; // Enregistrer les données dans works //
        return works;
}

// Affichage des Works dans le DOM //
function affichageWorks(arrayWorks) {
        gallery.innerHTML = ""; // Vider la galerie //
        arrayWorks.forEach(works => {
            const figure  = document.createElement("figure"); // Création d'une figure pour chaque élément //
            const img = document.createElement("img"); // Création d'une image pour chaque élément //
             img.src = works.imageUrl; // Source fichier API/Works //
            const figcaption = document.createElement("figcaption"); // Création du titre qui accompagne img // 
            figcaption.textContent = works.title; // Source fichier API/Works //
            figure.appendChild(img); // Emplacement img/Div figure //
            figure.appendChild(figcaption);// Emplacement figcaption/Div figure //
            gallery.appendChild(figure);// Emplacement figure/Div gallery //
        });
}

async function updateUI() {
    const data = await getWorks()
    affichageWorks(data)
}


//---------------------------------------- //
//      Affichage dynamique des Categories //
//---------------------------------------  //
 async function getCategories() { 
        const response = await fetch("http://localhost:5678/api/categories"); // Attendre que le fichier soit généré //
        const data = await response.json() ;// Convertir en .json//
        categories = data; // Enregistrer les données dans categories //
}

//--------------------------------------------- //
//      Affichage dynamique des Boutons Filtres //
//--------------------------------------------  //

function createButton(buttonData) {
        const button = document.createElement("button");
        button.textContent = buttonData.name;
        button.classList.add('btn')
        button.dataset.id = buttonData.id;
        filters.appendChild(button);

        if (buttonData.id === 0) {
            button.classList.add('active')
        }

        button.addEventListener('click', () => {
            const buttons = document.querySelectorAll('.btn')
            buttons.forEach(button => button.classList.remove('active'))
            button.classList.add('active')
            gallery.innerHTML = "";
            if (buttonData.id === 0) {
                affichageWorks(works)
            } else {
                const worksFiltered = works.filter(work => work.categoryId === buttonData.id)
                affichageWorks(worksFiltered)
            }
        })
}

function createCategories(arrayCategories) {
    createButton({name: "Tous", id: 0})
    arrayCategories.forEach(element => {
        createButton(element)
    });
}



async function init() {
   await getWorks()
   await getCategories()
   affichageWorks(works)
   createCategories(categories)

}

init()
const admiModif = document.querySelector(".portfolio-content span"); // Sélectionner l'élément span qui contient l'icône et le bouton "modifier
if (token) {
    // Si l'utilisateur est connecté, afficher l'icone et le bouton "modifié"et cacher les filtres //
    admiModif.classList.remove('hidden'); 
    document.querySelector('.admin-panel').style.display = "flex"
    filters.style.display = "none"
    admiModif.style.display="flex"
    logoutButton.textContent = "logout"
    logoutButton.href = "#"
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault()
        sessionStorage.removeItem('token')
        location.reload()
    })
}

modalButton.addEventListener('click', (e) => {
    e.preventDefault()

   });



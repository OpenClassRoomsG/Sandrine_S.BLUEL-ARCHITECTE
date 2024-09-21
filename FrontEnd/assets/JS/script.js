 
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
    affichageWorks(works)
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

function displayPhotos(works) {
    photoModal.innerHTML = ""; // Réinitialiser le contenu

        // Boucle à travers chaque travail pour afficher les images
        works.forEach(work => {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const span = document.createElement("span");
            const trash = document.createElement("i"); // Emplacement Poubelle
            trash.classList.add("fa-solid", "fa-trash-can"); // Icone Poubelle
            trash.setAttribute("data-id", work.id); // Utilisation de data-id pour l'identifiant 

// Evènement de la suppression //
trash.addEventListener("click",(e) => {
            const id = trash.getAttribute("data-id"); // On récupère l'ID
            const init = {
                // Paramètres pour Fetch API
                method: "DELETE", // Méthode correcte
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
                },
            }

            fetch("http://localhost:5678/api/works/" + id, init) // Supprime l'élément avec l'ID
                .then((response) => {
                    if (!response.ok) {
                        console.log("La suppression n'a pas abouti!");
                        return; // Arrête l'exécution si la suppression échoue
                    }
                })
                .then(() => { // On récupère les données
                    console.log("La suppression a réussi :"); // On récupère les données //
                    works = works.filter(work => work.id !== Number(id))
                    displayPhotos(works); // Mise à jour de l'affichage après suppression
                    affichageWorks(works)
                })
                                  
                .catch((error) => {
                    console.error("La suppression n'a pas réussie !:", error); // Gestion des erreurs
                });
        });


            img.src = work.imageUrl; // Pour chaque work, Url identifié
            img.alt = work.title || "Image"; // Texte alternatif pour l'image
            span.appendChild(trash); // Ajoute l'icône poubelle dans le span
            figure.appendChild(span);
            figure.appendChild(img);
            photoModal.appendChild(figure); // Ajoute le figure à la galerie
        });
    
}



async function init() {
    await getWorks()
    await getCategories()
    affichageWorks(works)
    displayPhotos(works); 
    createCategories(categories)

}

init()

// Si l'utilisateur est connecté, afficher l'icone et le bouton "modifié"et cacher les filtres //
const admiModif = document.querySelector(".portfolio-content span"); // Sélectionner l'élément span qui contient l'icône et le bouton "modifier
if (token) {
        admiModif.classList.remove('hidden'); 
    document.querySelector('.admin-panel').style.display = "flex"
    filters.style.display = "none"
    admiModif.style.display="flex"
    logoutButton.textContent = "logout"
    logoutButton.href = "#"
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault()
        sessionStorage.removeItem('token')
        location.reload() // Recharger la page //
    })
}

modalButton.addEventListener('click', (e) => {
    e.preventDefault()

   });



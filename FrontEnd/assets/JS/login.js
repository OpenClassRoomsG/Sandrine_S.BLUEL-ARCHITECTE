//-----------------------------//
//  Page de Connexion/LOGIN    //
//---------------------------- //

// ------- Requète API ---------------------------//

function requestLogin() {
    return fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({// Convertir en chaine de caractères Json//
            "email": stockInputEmail,
            "password": stockInputPassword,
        })
    });
};
// ---- Les variables et Récupération du DOM-----------------------------------------//

const password = document.querySelector("form #password");
const email = document.querySelector("form #email");
const form= document.querySelector("form");// Pour faire un écouteur d'évènement //
const submit = document.querySelector('input[type="submit"]');
const messageErreur = document.querySelector("#login p");
const login = document.getElementById("login");

//------ Création Variable de stockage des valeurs -----------//

let stockInputPassword = password.value;//Récupération de la valeur dans le champs //
let stockInputEmail = email.value;


//--Gestion du Clic du champs de soumission formulaire de connexion//

form.addEventListener('submit', (e) => { //Ajout écouteur d'évènement au Clic //
    e.preventDefault();// Bloquer la gestion du clic par défaut-Empêche l'envoi du formulaire et la recherge de la page //
    stockInputEmail = email.value;// Stockage des valeurs des champs Input pour les stocker dans la variable//
    stockInputPassword = password.value;
    requestLogin()// fonction requête HTTP connexion //
        .then((response) => response.json())// Conversion de la répons en .json //
        .then(login => {// Traitement de la réponse en .json avec Boucle//
            if (login.token) {// Données personnelles et sécurisées //
                sessionStorage.setItem('token', login.token);//Stockage dans LocalStorage//
                window.location.href = "../index.html";// Redirection Page Accueil HTML//
            } else {
                console.error("Le token n'a pas été trouvé");// Si authentification échoue=message//
                messageErreur.innerHTML = "Votre Email ou Mot de passe est incorrect";// Message ERR en rouge et Réinitialisation //
            };
        });
});

// ------ Récupération des données et affichage dans Console.log --------------//

email.addEventListener('input', (e) => {
    console.log(e.target.value);

});
password.addEventListener('input', (e) => {
    console.log(e.target.value);
});




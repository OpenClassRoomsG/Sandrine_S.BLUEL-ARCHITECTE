//--------------------------------------------------------------------//
//      Affichage dynamique de la 1ère MODALE (Affichage photos)     //
//------------------------------------------------------------------ //

// Déclaration des variables DOM //
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".close");
const photoModal = document.querySelector(".photoModal");

// Ouvrir la modale
openModalBtn.onclick = function () {
  modal.style.display = "block"; // La modale est visible
};

// Fermer la modale en cliquant sur le bouton de fermeture
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// Fermer la modale en cliquant en dehors du contenu de la modale
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

//--------------------------------------------------------------------//
//      Affichage dynamique de la 2ème MODALE (Ajout/Supp photos)     //
//------------------------------------------------------------------ //

// Déclaration des variables DOM  //
const addPhotoBtn = document.querySelector(".bouton2");
const modalAddPhoto = document.querySelector(".modalAdd");
const modalContent = document.querySelector(".modal-content");
const arrowLeft = document.querySelector(".fa-arrow-left");
const markAdd =
  document.querySelector(".modalAdd .close"); /*La croix de la 2ème Modale*/
const modalMain = document.getElementById("portfolio");

// Fonction pour afficher la 2ème Modale avec le clic bouton Ajout //
function displayModalAdd() {
  addPhotoBtn.addEventListener("click", () => {
    modalAddPhoto.style.display = "flex"; /** 2ème Modale apparait **/
    modalContent.style.display = "none"; /** 1ère Modale disparait**/
  });
  // Retour à la première modale en cliquant sur la flèche
  arrowLeft.addEventListener("click", () => {
    modalAddPhoto.style.display = "none"; /** 2ème Modale disparait **/
    modalContent.style.display = "flex"; /** 1ère Modale apparait**/
  });

  // Fermer la 2ème modale en cliquant sur la croix
  markAdd.addEventListener("click", () => {
    modalAddPhoto.style.display = "none"; // Cache la 2ème Modale
    modalContent.style.display = "none"; /** 1ère Modale disparait**/
    modal.style.display = "none"; // Cache la 1ère Modale
  });
}

displayModalAdd(); /** On appelle la fonction **/

// Vérification que la taille du fichier < 4MO //
function checkFileSize(file) {
  const maxSizeInBytes = 4 * 1024 * 1024; // 4 Mo en octets
  if (file.size > maxSizeInBytes) {
    alert(
      "Le fichier est trop volumineux. La taille maximale autorisée est de 4 Mo."
    );
    return false;
  }
  return true;
}

// Prévisualisation de l'image //

// Déclaration des variables DOM //
const previewImg = document.querySelector(".containerAdd img");
const inputFile = document.querySelector(".containerAdd input[type='file']");
const labelFile = document.querySelector(".containerAdd label");
const iconeFile = document.querySelector(".containerAdd .fa-image");
const pFile = document.querySelector(".containerAdd p");

// Ecouter les changements dans Input File //
inputFile.addEventListener("change", () => {
  const file = inputFile.files[0]; // On récupère le fichier sélectionné //

  // Vérifier si un fichier est sélectionné et si c'est une image et si la taille est respectée//
  if (file && file.type.startsWith("image/") && checkFileSize(file)) {
    const reader = new FileReader(); // Créer un FileReader pour lire le contenu du fichier

    reader.onload = function (e) {
      // Fonction pour prévisualisr les images et les lire //
      previewImg.src = e.target.result; // Met à jour la source de l'image avec le contenu du fichier
      previewImg.style.display = "block"; // Affiche l'image de prévisualisation
      labelFile.style.display = "none"; // Cache le label "Ajouter photo"
      iconeFile.style.display = "none"; // On cache l'icône
      pFile.style.display = "none"; // On cache le paragraphe d'instructions
    };
    reader.readAsDataURL(file); // Lire le fichier comme URL de données
  } else {
    // Gérer le cas où le fichier sélectionné n'est pas une image ou trop volumineux
    if (!file || !file.type.startsWith("image/")) {
      alert("Veuillez sélectionner un fichier image valide (jpg, png).");
    }
    inputFile.value = ""; // Réinitialiser l'input file
    previewImg.style.display = "none"; // Masquer l'image si elle est affichée
    labelFile.style.display = "block"; // Rendre le label visible à nouveau
    iconeFile.style.display = "block"; // Rendre l'icône visible à nouveau
    pFile.style.display = "block"; // Rendre le paragraphe d'instructions visible
  }
});

// Création de la liste des catégories dans l'input //
const categorySelect = document.getElementById("category");

// Fonction pour récupérer les catégories depuis une API
async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des catégories");
    }

    const categories = await response.json(); // Convertir la réponse en JSON //

    // Appeler la fonction pour ajouter les catégories au <select> //
    categorySelectAdd(categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
  }
}

// Fonction pour ajouter les catégories au <select>
function categorySelectAdd(categories) {
  categorySelect.innerHTML = ""; // Vider le <select> avant d'ajouter de nouvelles options //

  // Option par défaut pour indication à l'utilisateur //
  const defaultOption = document.createElement("option");
  defaultOption.value = ""; // Valeur vide des options //
  defaultOption.textContent = "Sélectionnez une catégorie";
  categorySelect.appendChild(defaultOption);

  // Boucle à travers chaque catégorie et créer une <option> pour chacune //
  categories.forEach((category) => {
    const option = document.createElement("option"); // On crée une option //
    option.value = category.id; // l'ID de la catégorie pour la valeur //
    option.textContent = category.name; // le nom de la catégorie pour l'affichage //
    categorySelect.appendChild(option); // Ajouter l'option au <select> //
  });
}

// Appeler la fonction pour récupérer et afficher les catégories au chargement de la page //
fetchCategories();

// Faire un POST pour ajouter une photo //

// Déclaration des variables DOM //
const addPhotoForm = document.querySelector(".modalAdd form");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const inputFileAdd = document.querySelector(".containerAdd input[type='file']");
const previewImgAdd = document.querySelector(".containerAdd img");
const labelFileAdd = document.querySelector(".containerAdd label");
const iconeFileAdd = document.querySelector(".containerAdd .fa-image");
const pFileAdd = document.querySelector(".containerAdd p");

const submitButton = document.querySelector(".bouton3"); // Bouton "Valider"


// Gérer la soumission du formulaire via le bouton "Valider"
addPhotoForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Empêcher le rechargement de la page


  // Récupérer les données du formulaire
  const file = inputFileAdd.files[0];
  const title = titleInput.value.trim();
  const category = categoryInput.value;

  // Vérifier que tous les champs sont remplis
  if (!file || !title || !category) {
    alert("Veuillez remplir tous les champs et sélectionner une image.");
    return;
  }

  // Préparer les données pour l'envoi avec FormData
  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", title);
  formData.append("category", category);

  // Options pour la requête POST
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: formData,
  };

  try {
    // Envoyer les données à l'API
    const response = await fetch("http://localhost:5678/api/works", options);

    if (!response.ok) {
      throw new Error(
        "Erreur lors de l'ajout de la photo : " + response.statusText
      );
    }
    const data = await response.json();

    // Rafraîchir l'affichage des photos après l'ajout

    if (response.status === 201) {
      alert("Photo ajoutée avec succès !");
      works.push(data)
      affichageWorks(works);
      displayPhotos(works); // Supposant que displayPhotos recharge la galerie //
    }

    // Réinitialiser le formulaire après l'envoi
    addPhotoForm.reset();
    previewImgAdd.style.display = "none";
    labelFileAdd.style.display = "flex";
    iconeFileAdd.style.display = "block";
    pFileAdd.style.display = "block";

    // Fermer la deuxième modale et revenir à la première
    modalAddPhoto.style.display = "none";
    modalContent.style.display = "flex";
  } catch (error) {
    console.error("Erreur lors de l'ajout de la photo :", error);
    alert("Erreur lors de l'ajout de la photo.");
  }
});

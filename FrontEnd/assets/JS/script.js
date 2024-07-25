
//----------------------------------------//
//      Affichage dynamique des Works     //
//--------------------------------------- //

// Envoi Requête pour API et accès tableau Works  //    
 async function getWorks() { 
        const response = await fetch("http://localhost:5678/api/works"); // Attendre que le fichier soit généré //
        const data = await response.json() ;// Convertir en .json//
        createWorks(data);
        
    }
    getWorks(works); // On appelle la fonction de recherches données + création works


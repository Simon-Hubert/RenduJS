// VARIABLES
const bgCouleurs = document.querySelectorAll(".randomcolor"); 
                                            // Je récupère les classes qui m'intéressent et les stockent dans des variables.
const rerollButton = document.querySelector("#rerollButton");

// FONCTIONS
const toHex = (x) => {                      // Fonction pour convertir un integer en hexadecimal à 2 chiffres.
    x = x.toString(16);
    x = x.length == 2 ? x : `0${x}`;
    return x;
};

const changeColor = (x) => {                // Fonction pour changer aléatoirement la couleur du background de l'élément selectionné.
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    let bw = Math.floor((r+g+b)/3);         // La valeur de la couleur en noir et blanc.

    if (bw <= 127) {                        // Si la couleur est sombre on ecris en blanc sinon en noir.
        x.style.color = "white";
    }
    else {
        x.style.color = "black";
    }

    x.style.backgroundColor = `rgb(${r},${g},${b})`;
                                            // Applique le changement de background.
    x.style.borderColor = `rgb(${Math.max(Math.abs(r-15),0)},${Math.max(Math.abs(g-15),0)},${Math.max(Math.abs(b-15),0)})`;
                                            // On assombris la bordure en faisant attention de ne pas avoir de couleur négative.
    x.style.setProperty("--selectionColor",`rgb(${255-r},${255-g},${255-b})`);
                                            // Lors d'une selection on passe le selection background en negatif.
    x.style.setProperty("--textColor",`rgb(${r},${g},${b})`);
                                            // Lors d'une selection on passe la couleur du texte à la couleur du background.
    x.innerHTML = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
                                            // J'ecris le nom de la couleur.
};

const clicked = (x) => {                    // Fonction pour animer un element lorsqu'il est cliqué.
    x.classList.add("tada");
    x.addEventListener('animationend', ()=> {
        x.classList.remove("tada");
    });
};


// SCRIPT
bgCouleurs.forEach(element => {             // Initialisation de mes cartes de couleurs.
    changeColor(element);
    element.addEventListener("click", () => {
        clicked(element);
        changeColor(element);
    });
    element.addEventListener("mouseover", () => {
                                            // Ajout d'un shake lors d'un mouse over.
        element.classList.add("shakeX");
        element.addEventListener('animationend', ()=> {
        element.classList.remove("shakeX");
        });
    });
});

rerollButton.addEventListener("click", () => {
                                            // Rend le Bouton Reroll interactif.
    clicked(rerollButton);
    bgCouleurs.forEach(element => {
        changeColor(element);
    });
});
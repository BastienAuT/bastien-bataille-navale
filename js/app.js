// on vient régler le nombre de cases et de colonnes puis la taille de chaque case sur la grille
const rows = 8;
const cols = 8;
const squareSize = 50;

// ici on vient récupérer l'id de la grille (grid)
const gameBoardContainer = document.getElementById("gameboard");

// on créer les colonnes et les lignes de la grille
for (i = 0; i < cols; i++) {
  for (j = 0; j < rows; j++) {
    //on vient créer un nouveau élément div pour chaque case de la grille et on règle pour être sur que tout soit à la bonne taille
    const square = document.createElement("div");
    gameBoardContainer.appendChild(square);

    // on donne à chaque élément de div un id unique basé sur sa case et sa ligne
    square.id = "s" + j + i;

    // set each grid square's coordinates: multiples of the current row or column number
    let topPosition = j * squareSize;
    let leftPosition = i * squareSize;

    // on utilise le css et les propriétés css absolue positionning pour placer chaque case sur la grille
    square.style.top = topPosition + "px";
    square.style.left = leftPosition + "px";
  }
}

/* d'après les règles officielles d'Hasbro, il faut 17 tirs requis pour gagner une game avec :
      Porte-avion    - 5 hits
      Navire de guerre  - 4 hits
      Destroyer   - 3 hits
      Sous-marin  - 3 hits
      Bateau de patrouille - 2 hits
*/
let hitCount = 0;

/* ici, on vient créer un deuxième tableau qui va contenir le status de chaque case du plateau de jeu et on vient ensuite placer les bateaux sur le plateau (plus tard on viendra créer une fonction qui vient randomiser le tout)

si c'est 0 c'est vide , si c'est 1 = on touche un bateau 2 = un bateau coulé et 3 = un tir râté
*/
let currentCellID = "cell" + rows + cols;


let currentCellElement = document.getElementById(currentCellID);
 gameBoard = [
  ["0", "1", "1", "1", "", "", "", ""],
  ["1", "", "", "", "", "","",""],
  ["1", "0", "1", "1", "1", "1","",""],
  ["1", "", "", "", "", "1", "", ""],
  ["1", "", "", "", "", "1", "", ""],
  ["1", "", "1", "1", "", "1", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
];

// on vient mettre un listener pour tous les éléments du tableau de jeu on utilise la fonction fireTorpido quand une case (un carré / un rectangle spéciale dédicasse Clémence) est cliquée
gameBoardContainer.addEventListener("click", fireTorpedo, false);

function fireTorpedo(e) {
  // si l'élément cliqué (l'event cible) n'est pas le parent ou le event listener qui a été réglé
  if (e.target !== e.currentTarget) {
    // on extrait les cases et les colonnes # de l'élément id depuis le html
    const row = e.target.id.substring(1, 2);
    const col = e.target.id.substring(2, 3);
    //alert("ON A TIRE ICI CAPITAINE " + row + ", col " + col);

    // si le joueur clique sur une case avec aucun bateau , on change la couleur et la valeur de la case (ici en bleu pour indiquer plouf quoi)
    if (gameBoard[row][col] == 0) {
      e.target.style.background = 'url(https://images.emojiterra.com/mozilla/512px/1f30a.png)';
      e.target.style.backgroundSize = 'contain';
      // on vient régler la case en 3 pour indiquer que l'on a tiré et que ça a fail
      gameBoard[row][col] = 3;

      //si le joueur clique sur une case avec un bâteau , ici aussi on change la couleur et la valeur de la case (rouge et yay on a touché)
    } else if (gameBoard[row][col] == 1) {
      e.target.style.background = 'url(https://images.emojiterra.com/mozilla/512px/1f4a5.png)';
      e.target.style.backgroundSize = 'contain';
      // on mets la valeur de la case en 2 pour indiquer qu'un bateau a été touché
      gameBoard[row][col] = 2;

      // on vient incrémenter "hitCount" à chaque fois qu'un bateau est touché
      hitCount++;
      // étant une fraude (ou du moins j'ai le sentiment car sans aide , je n'arriverais pas à grand chose.. on devrait faire en sorte que ça soit codé autrement qu'en hard code...
      if (hitCount == 17) {
        alert(
          "Commandant, ici pédoncule, tous les ennemis sont morts, je repète , l'oiseau a mangé ses endives."
        );
      }

      // si le joueur clique sur une case qui a déjà été touchée alors il faut le notifier via un magnifique message
    } else if (gameBoard[row][col] > 1) {
      alert("T'as déjà tiré ici espèce de banane.");
    }
  }
  e.stopPropagation();
}

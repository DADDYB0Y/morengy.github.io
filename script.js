// Dimensions du ring
const RING_WIDTH = 500;
const RING_HEIGHT = 400;

// Taille des joueurs
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;

// Points
let score1 = 0; 
let score2 = 0;

// Vitesse des joueurs
const PLAYER_SPEED = 30;

// Récupération du ring, joueure
const ring = document.getElementById('ring');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

// Positionner les joueurs
player1.style.left = (RING_WIDTH / 2 - PLAYER_WIDTH / 2) + 'px';
player1.style.top = (RING_HEIGHT - PLAYER_HEIGHT) + 'px';
player2.style.left = (RING_WIDTH / 2 - PLAYER_WIDTH / 2) + 'px';
player2.style.top = 0 + 'px';

// Déterminer si le jeu est en cours
let gameInProgress = false;

// Displayinf score
function displayScore() {
  document.getElementById("score1").innerHTML = "Score Joueur 1 : " + score1;
  document.getElementById("score2").innerHTML = "Score Joueur 2 : " + score2;
}

// Fonction de gestion du déplacement du joueur 1
function handlePlayer1Movement(event) {
  event.preventDefault();
  const key = event.key;
  const player1PosX = parseInt(player1.style.left);
  const player1PosY = parseInt(player1.style.top);

  if (key === 'q' && player1PosX > 0) {
    player1.style.left = (player1PosX - PLAYER_SPEED) + 'px';
  } else if (key === 'd' && player1PosX < (RING_WIDTH - PLAYER_WIDTH)) {
    player1.style.left = (player1PosX + PLAYER_SPEED) + 'px';
  } else if (key === 'z' && player1PosY > 0) {
    player1.style.top = (player1PosY - PLAYER_SPEED) + 'px';
  } else if (key === 's' && player1PosY < (RING_HEIGHT - PLAYER_HEIGHT)) {
    player1.style.top = (player1PosY + PLAYER_SPEED) + 'px';
  }

  // Vérifier si joueur 1 a dépassé la limite du ring
  if (player1PosX < 0 || player1PosX > (RING_WIDTH - PLAYER_WIDTH) || player1PosY < 0 || player1PosY > (RING_HEIGHT - PLAYER_HEIGHT)) {
    // Joueur 1 a perdu, réinitialiser le jeu
    alert("Le joueur 1 a perdu !");
    score2++;
    resetGame();
    displayScore();
  }

  // Vérifier si joueur 1 a atteint le sommet du ring
  if (player1PosY === 0 && gameInProgress) {
    // Joueur 1 a gagné, réinitialiser le jeu
    alert("Le joueur 1 a perdu !");
    score2++;
    resetGame();
    displayScore();
  }
}



// Fonction de gestion du déplacement du joueur 2
function handlePlayer2Movement(event) {
  event.preventDefault();
  const key = event.key;
  const player2PosX = parseInt(player2.style.left);
  const player2PosY = parseInt(player2.style.top);

  if (key === 'ArrowLeft' && player2PosX > 0) {
    player2.style.left = (player2PosX - PLAYER_SPEED) + 'px';
  } else if (key === 'ArrowRight' && player2PosX < (RING_WIDTH - PLAYER_WIDTH)) {
    player2.style.left = (player2PosX + PLAYER_SPEED) + 'px';
  } else if (key === 'ArrowUp' && player2PosY > 0) {
    player2.style.top = (player2PosY - PLAYER_SPEED) + 'px';
  } else if (key === 'ArrowDown' && player2PosY < (RING_HEIGHT - PLAYER_HEIGHT)) {
    player2.style.top = (player2PosY + PLAYER_SPEED) + 'px';
  }
    
    // Vérifier si joueur 2 a dépassé la limite du ring
    if (player2PosX < 0 || player2PosX > (RING_WIDTH - PLAYER_WIDTH) || player2PosY < 0 || player2PosY > (RING_HEIGHT - PLAYER_HEIGHT)) {
    // Joueur 2 a perdu, réinitialiser le jeu
    alert("Le joueur 2 a perdu !");
    score1++;
    resetGame();
    displayScore();
    }
    
    // Vérifier si joueur 2 a atteint le bas du ring
    if (player2PosY === (RING_HEIGHT - PLAYER_HEIGHT) && gameInProgress) {
    // Joueur 2 a perdu, réinitialiser le jeu
    alert("Le joueur 2 a perdu !");
    score1++;
    resetGame();
    displayScore();
    }
    }
    
    //-----------------PARTI COLLISION-----------------------------------------------------------------------------------

        // Fonction de détection de collision
        function detectCollision(player1, player2) {
            var rect1 = player1.getBoundingClientRect();
            var rect2 = player2.getBoundingClientRect();

            if (rect1.left < rect2.right &&
                rect1.right > rect2.left &&
                rect1.top < rect2.bottom &&
                rect1.bottom > rect2.top) {
                // Collision détectée, déplacer les joueurs pour les repousser
                player1.style.left = (parseInt(player1.style.left) - 100) + 'px';
                player2.style.left = (parseInt(player2.style.left) + 100) + 'px';
            }
        }

        // Fonction de mise à jour de la position des joueurs
        function update() {
            detectCollision(player1, player2);

            // Appeler cette fonction à chaque rafraîchissement de la page
            requestAnimationFrame(update);
        }

        // Appel initial de la fonction d'update
        update();

    //------------------------------------------------------------------------------------------------

    function updateScores() {
      const scoreElement1 = document.getElementById('score1'); // Element HTML pour afficher le score du Joueur 1
      const scoreElement2 = document.getElementById('score2'); // Element HTML pour afficher le score du Joueur 2
    
      scoreElement1.textContent = 'Score Joueur 1: ' + score1; // Mettre à jour le score du Joueur 1 dans l'élément HTML
      scoreElement2.textContent = 'Score Joueur 2: ' + score2; // Mettre à jour le score du Joueur 2 dans l'élément HTML
    
      document.getElementById("score1").innerHTML = "Score Joueur 1: " + score1;
      document.getElementById("score2").innerHTML = "Score Joueur 2: " + score2;
    
    }


    //------------------------------------------------------------------------------------------------------

    // Fonction d'affichage des scores des joueurs
    function drawScores() {
    ctx.fillStyle = 'black';
    ctx.font = '24px sans-serif';
    ctx.fillText('Player 1: ' + score1, 10, 30);  // Affichage du score du joueur 1
    ctx.fillText('Player 2: ' + score2, canvas.width - 120, 30);  // Affichage du score du joueur 2
    }
  

    //---------------------------------------------------------------------------------------------------

    // Fonction de démarrage du jeu
    function startGame() {
    // Cacher le bouton de démarrage
    document.getElementById('startButton').style.display = 'none';
    // Ajouter les écouteurs d'événements pour les mouvements des joueurs
    document.addEventListener('keydown', handlePlayer1Movement);
    document.addEventListener('keydown', handlePlayer2Movement);
    // Définir le jeu en cours
    gameInProgress = true;
    }
    
    // Fonction de réinitialisation du jeu
    function resetGame() {
    // Remonter les joueurs au centre du ring
    player1.style.left = (RING_WIDTH / 2 - PLAYER_WIDTH / 2) + 'px';
    player1.style.top = (RING_HEIGHT - PLAYER_HEIGHT) + 'px';
    player2.style.left = (RING_WIDTH / 2 - PLAYER_WIDTH / 2) + 'px';
    player2.style.top = 0 + 'px';
    // Remontrer le bouton de démarrage
    document.getElementById('startButton').style.display = 'block';
    // Supprimer les écouteurs d'événements pour les mouvements des joueurs
    document.removeEventListener('keydown', handlePlayer1Movement);
    document.removeEventListener('keydown', handlePlayer2Movement);
    // Réinitialiser le statut du jeu
    gameInProgress = false;
    }
    
    // Ajouter un écouteur d'événement pour le bouton de démarrage
    document.getElementById('startButton').addEventListener('click', startGame);
    document.addEventListener("keydown", function(event) {
          if (event.code === "Space" || event.code === "Enter") {
              startGame();
          }
      });
  
    // Pour jouer de la musique dans le jeu
    document.getElementById("startButton").addEventListener("click", function() {
      var audio = document.getElementById("myAudio");
      audio.play();
    });
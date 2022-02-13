//initialisation des variables
let body = document.querySelector("body");
let perso = document.getElementById("perso");
let rat = document.getElementById("rat");
let alertgo = document.getElementById("alertGO");
alertgo.style.display = "none";
let alertGG = document.getElementById("alertGG");
alertGG.style.display = "none";

//ajoute l'animation au background du body
body.classList.add("bganimation");

//score
let score = 0;
const X = Math.ceil((100 * 1000) / 50);
let scoreElem = document.getElementById("score");
function count() {
  scoreElem.innerHTML = ++score;
  //tant que le score est inférieur à 50 il continuera d'augmenter de +1
  if (score < 50) {
    setTimeout(count, X);
  }
  //quand le score est égal à 50 le joueur a gagné apparition du module correspondant
  if (score == 50) {

    rat.style.animation = "none";
    rat.style.display = "none";
    body.classList.remove("bganimation");

    let pseudogg = prompt("Choisir un pseudo");
    alertgo.style.display = "none";
    let tempsgg = new joueur(pseudogg, score);
    tempsgg.gg(pseudogg);

  }
}
setTimeout(count, X);

//acceleration rat
function level() {
  if (score >= 5 && score <= 10) {
    rat.style.animationDuration = "3.5s";
  }
  if (score >= 10 && score <= 15) {
    rat.style.animationDuration = "3s";
  }
  if (score >= 15 && score <= 20) {
    rat.style.animationDuration = "2.75s";
  }
  if (score >= 20 && score <= 25) {
    rat.style.animationDuration = "2.5s";
  }
  if (score >= 25 && score <= 30) {
    rat.style.animationDuration = "2.25s";
  }
  if (score >= 30 && score <= 35) {
    rat.style.animationDuration = "2s";
  }
  if (score >= 35 && score <= 40) {
    rat.style.animationDuration = "1.5s";
  }
  if (score >= 40 && score <= 50) {
    rat.style.animationDuration = "1s";
  }
};

//animation jump lorsque la barre espace est enfoncée
document.addEventListener('keydown', function (jump) {
  if (jump.code === 'Space') {
    perso.classList.add("animate");
    perso.src = `img/jump.png`;
    level();
    setTimeout(function () {
      perso.classList.remove("animate");
      perso.src = `img/run.png`;
    }, 500);
  }
});

//personnalisation du joueur, récupération du nom et du score du joueur
class joueur {
  constructor(nom, score) {
    this.nom = nom;
    this.score = score;
  }
  //le joueur a perdu, appartition du module game over
  perdu(player) {
    alertgo.style.display = "block";
    const node = document.createElement("p");
    const textnode = document.createTextNode(player + " ton score est de " + score + "  Sale noob !!!");
    node.appendChild(textnode);
    document.getElementById("lose").appendChild(node);
  }
  //le joueur a gagné, apparition du module gg (bien joué)
  gg(player) {
    alertGG.style.display = "block";
    const nodegg = document.createElement("p");
    const textnodegg = document.createTextNode(player + " ton score est de " + score + "  Bravo!!! (personne croyait en toi)");
    nodegg.appendChild(textnodegg);
    document.getElementById("gagner").appendChild(nodegg);

  }
}

//détection de la colision entre le personnage et le rat
function deadNow() {
  let dead = setInterval(function () {
    //récupération de la position du personnage et du rat
    let persoTop = parseInt(window.getComputedStyle(perso).getPropertyValue("top"));
    let ratLeft = parseInt(window.getComputedStyle(rat).getPropertyValue("left"));
    //si il y a colision alors changer image du personnage et faire disparaitre le rat
    if (ratLeft < 400 && ratLeft > 350 && persoTop >= 455) {

      perso.src = `img/dead.png`;
      rat.style.animation = "none";
      rat.style.display = "none";
      //stopper animation du background de body
      body.classList.remove("bganimation");

      //recup score et nom joueur
      let pseudo = prompt("Choisir un pseudo");
      let tempsperdu = new joueur(pseudo, score);
      tempsperdu.perdu(pseudo);

      //le chrono disparait
      let chrono = document.getElementById("chrono");
      chrono.style.display = "none";

      //TEST LOCALSTORAGE : 
      // function storage() {
      //   localStorage.setItem("pseudo", pseudo);
      //   localStorage.setItem("score", score);
      //   let stockPseudo = localStorage.getItem("pseudo");
      //   let stockScore = localStorage.getItem("score");
      //   const node = document.createElement("p");
      //   const textnode = document.createTextNode("Score précédent : " + stockScore + " obtenue par " + stockPseudo);
      //   node.appendChild(textnode);
      //   document.getElementById("scoreavant").appendChild(node);
      // }
      // storage();


    }
  }, 10);

}
deadNow();

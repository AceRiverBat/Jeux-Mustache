
let body = document.querySelector("body");
let perso = document.getElementById("perso");
let rat = document.getElementById("rat");

body.classList.add("bganimation");

let score = 0;
const X = Math.ceil((100*1000)/50);
let scoreElem = document.getElementById("score");
function count(){
  scoreElem.innerHTML = ++score;
  if(score<50){
    setTimeout(count, X);
  }
}
setTimeout(count, X);

function level(){
  if (score>= 5 && score<= 10) {
    rat.style.animationDuration="3.5s";
  } 
  if (score>= 10 && score<= 15) {
    rat.style.animationDuration="3s";
  } 
  if (score>= 15 && score<= 20) {
    rat.style.animationDuration="2.75s";
  } 
  if (score>= 20 && score<= 25) {
    rat.style.animationDuration="2.5s";
  } 
  if (score>= 25 && score<= 30) {
    rat.style.animationDuration="2.25s";
  } 
  if (score>= 30 && score<= 35) {
    rat.style.animationDuration="2s";
  } 
  if (score>= 35 && score<= 40) {
    rat.style.animationDuration="1.5s";
  } 
  if (score>= 40 && score<= 50) {
    rat.style.animationDuration="1s";
  } 
};


document.addEventListener('keydown', function(jump){
  if (jump.code === 'Space'){
    perso.classList.add("animate");
    perso.src = `img/jump.png`;
    level();
    setTimeout(function(){
      perso.classList.remove("animate");
      perso.src = `img/run.png`;
    },500);
  }
});
let win = setInterval(function(){
  if (score == 50) {
    rat.style.animation = "none";
    rat.style.display = "none";
    body.classList.remove("bganimation");
    alert("YOU WIN !")
  }
},10);

// class pseudo{
//   constructor(nom,score){
//     this.nom = nom;
//     this.score = score;
//   }
//   perdu(){
//     document.write("Ton score est de " + score);
//     // document.write("Le meilleur score est de " + scoreavant);
//   }
// }

let dead = setInterval(function(){
let persoTop = parseInt(window.getComputedStyle(perso).getPropertyValue("top"));
let ratLeft = parseInt(window.getComputedStyle(rat).getPropertyValue("left"));
if (ratLeft < 400 && ratLeft > 350 && persoTop >= 455) {
  
  rat.style.animation = "none";
  rat.style.display = "none";
  perso.src = `img/dead.png`;
  body.classList.remove("bganimation");

  // let choix = prompt("Choisir un pseudo");
  // choix.perdu();
  alert("GAME OVER!")

  document.location.reload(false)
}
}, 10);

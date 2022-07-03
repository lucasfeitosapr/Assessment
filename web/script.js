
// Objeto global para a aplicação
let app = {
   // Propriedades do objeto no formato par 'chave: valor'
   container: document.getElementById("container"),
   cards: loadCards(),
   firstCard: [],
   cardContainers: [],
   cells: [],
   table: null,
   minutesLabel: document.getElementById("minutes"),
   secondsLabel: document.getElementById("seconds"),
   totalSeconds: 0,
   newGame: document.getElementById("newGame"),
   intervalId: null,
   // Classes do objeto
   iniciar: function () {
      console.log(app.container)
      if(window.refreshIntervalId != null) {
         console.log("clear interval")
         clearInterval(window.refreshIntervalId);
         app.secondsLabel.innerHTML = " : " + 00;
         app.minutesLabel.innerHTML = 00;
         app.totalSeconds = 0;
      }
      app.cards = loadCards();
      app.newGame.addEventListener("click", app.iniciar);
      if(app.table != null) {
         app.container.removeChild(app.table);
      }
      tableCreate();
      window.refreshIntervalId = setInterval(setTime, 1000);
      console.log(app.intervalId)
   },

};

(() => {
   
   // Chamar o método do objeto global
   app.iniciar();


})();

function setTime() {
   app.totalSeconds++;
   app.secondsLabel.innerHTML = pad(" : " + app.totalSeconds % 60);
   app.minutesLabel.innerHTML = pad(parseInt(app.totalSeconds / 60));
}

function pad(val) {
   var valString = val + "";
   if (valString.length < 2) {
     return "0" + valString;
   } else {
     return valString;
   }
}

function tableCreate() {
   const tbl = document.createElement('table');

   tbl.style.width = '800px';
   tbl.style.height = '600px';
   tbl.style.border = '1px solid black';
   tbl.style.textAlign = 'center';
   let count = 0;

   for (let i = 0; i < 4; i++) {
     const tr = tbl.insertRow();
     for (let j = 0; j < 4; j++) {

         const td = tr.insertCell();

         let cardContainer = document.createElement("div");
         cardContainer.className = "card";
         cardContainer.id = `card${count}`;
         
         let divFront = document.createElement("div")
         divFront.className = "front";

         let divBack = document.createElement("div")
         divBack.className = "back";

         let imgBack = document.createElement("img");
         imgBack.src = app.cards[count].backPath;

         let imgFront = document.createElement("img");
         imgFront.src = app.cards[count].path;
         imgFront.id = app.cards[count].id;
         
         divBack.appendChild(imgBack);
         divFront.appendChild(imgFront);

         cardContainer.appendChild(divBack);
         cardContainer.appendChild(divFront);

         td.style.border = '1px solid black';
         td.appendChild(cardContainer);

         td.addEventListener("click", flipCard);

         count++;
     }
   }

   app.table = tbl;
   app.container.appendChild(tbl);
}

function flipCard() {
   // console.log("cell clicked: ", this.cellIndex, "Row Index: ",  this.parentNode.rowIndex)

   const cell = this;
   const row = cell.parentElement;

   if(cell.querySelectorAll('img')[1] === app.firstCard[0]) return;
   if(cell.querySelectorAll('img')[1] === app.firstCard[1]) return;

   // console.log(cell.querySelectorAll("div")[1].classList.toggle("flipCard"));
   
   let divCard = cell.querySelector("div");
   divCard.classList.toggle("flipCard");

   
   if(app.firstCard.length === 1) {
      app.firstCard.push(cell.querySelectorAll('img')[1])
      app.cardContainers.push(divCard);
      app.cells.push(cell);
   }

   if(app.firstCard.length === 0) {
      app.firstCard.push(cell.querySelectorAll('img')[1])
      app.cardContainers.push(divCard);
      app.cells.push(cell);
   }

   if(app.firstCard.length === 2) {

      document.body.style.pointerEvents = 'none';
      setTimeout(verifyCards, 1500);

   }

      
}

function verifyCards() {
   
   if(app.firstCard[0].id.includes(app.firstCard[1].id)){
      app.cardContainers = [];
      app.firstCard = [];
      app.cells[0].removeEventListener("click", flipCard);
      app.cells[1].removeEventListener("click", flipCard);
      app.cells = [];
      document.body.style.pointerEvents = 'auto';
      app.cards.pop();
      app.cards.pop();

      if(app.cards.length === 0) {
         let minutes = app.minutesLabel.textContent;
         let seconds = app.secondsLabel.textContent;

         window.alert(`Jogo terminado em: ${minutes}${seconds}! Gerando novo jogo...`);
         app.iniciar();
      }

   } else {
      app.cardContainers[0].classList.toggle("flipCard");
      app.cardContainers[1].classList.toggle("flipCard");
      app.cardContainers = [];
      app.firstCard = [];
      app.cells = [];
      document.body.style.pointerEvents = 'auto';
   }
}
 

function loadCards() {
   let cards = [];

   for(let i = 0; i < 8; i++) {
      
      let card = {
         id: `img${i+1}`,
         path: `../img/img${i+1}.png`,
         backPath: '../img/back.png'
      }
      
      cards.push(card);
   }

   cards = cards.concat(cards);
   shuffleArray(cards);

   return cards;
}

function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
   }
}

class Card {
   constructor(id, path, backPath) {
      this.id = id;
      this.path = path;
      this.backPath = backPath;
   }
}

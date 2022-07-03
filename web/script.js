// Objeto global para a aplicação
let app = {
   // Propriedades do objeto no formato par 'chave: valor'
   container: document.getElementById("container"),
   minutesLabel: document.getElementById("minutes"),
   secondsLabel: document.getElementById("seconds"),
   newGame: document.getElementById("newGame"),
   cards: null,
   selectedCards: [],
   cardContainers: [],
   cells: [],
   table: null,
   totalSeconds: 0,
   intervalId: null,

   // Classes do objeto
   loadGame: function () {
      app.newGame.addEventListener("click", app.iniciar);
      app.cards = loadCards();
      generateGameBoard();
      flipAllCards();

   },

   iniciar: function () {
      app.cards = loadCards();


      if(hasRunningInterval()) {
         clearTimer();
      }

      if(hasTable()) {
         app.container.removeChild(app.table);
      }

      generateGameBoard();

      flipAllCards();

      if(hasRunningSetTimeout()) {
         clearSetTimeout();
      }

      window.setTimeoutId = setTimeout(function(){
         flipAllCards();
         window.refreshIntervalId = setInterval(timer, 1000)
      }, 2000);
      
      
   },

};

(() => {
   
   // Chamar o método do objeto global
   app.loadGame();


})();

function timer() {
   app.totalSeconds++;
   app.secondsLabel.innerHTML = formatTimer(app.totalSeconds % 60);
   app.minutesLabel.innerHTML = formatTimer(parseInt(app.totalSeconds / 60)) + " :";
}

function formatTimer(time) {
   var timeString = time + "";
   if (timeString.length < 2) {
     return "0" + timeString;
   } else {
     return timeString;
   }
}

function clearTimer() {
   clearInterval(window.refreshIntervalId);
   app.secondsLabel.innerHTML = " : " + 00;
   app.minutesLabel.innerHTML = 00;
   app.totalSeconds = 0;
}

function hasRunningInterval() {
   return window.refreshIntervalId != null;
}

function clearSetTimeout() {
   clearTimeout(window.setTimeoutId);
}

function hasRunningSetTimeout() {
   return window.setTimeoutId != null;
}

function generateGameBoard() {
   const tbl = createTable();

   createRowsAndColumns(tbl);

   app.table = tbl;
   app.container.appendChild(tbl);
}


function hasTable() {
   return app.table != null;
}

function createTable() {
   let table = document.createElement('table');

   table.style.width = '800px';
   table.style.height = '600px';
   table.style.border = '1px solid black';
   table.style.textAlign = 'center';

   return table;
}

function createRowsAndColumns(tbl) {

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
}

function flipCard() {

   const cell = this;

   if(clickedOnSameCard(cell, 0)) return;
   if(clickedOnSameCard(cell, 1)) return;

   let divCard = cell.querySelector("div");
   divCard.classList.toggle("flipCard");

   updateSelectedCard(cell, divCard);

   if(app.selectedCards.length === 2) {
      document.body.style.pointerEvents = 'none';
      setTimeout(verifyCards, 1500);
   }
}

function flipAllCards() {
   let cards = document.querySelectorAll('.card')
   cards.forEach(card => {
      card.classList.toggle("flipCard");
   })
}

function updateSelectedCard(cell, divCard) {
   app.selectedCards.push(cell.querySelectorAll('img')[1])
   app.cardContainers.push(divCard);
   app.cells.push(cell);
}

function clickedOnSameCard(cell, cardNumber) {
   return cell.querySelectorAll('img')[1] === app.selectedCards[cardNumber];
}

function verifyCards() {
   
   if(cardsMatch()){
      
      disableMatchedCards();

      resetTurn();

      if(hasNoCardsLeft()) {
         finishAndRestartGame();
      }

   } else {

      flipBackCards();

      resetTurn();
   }
}

function resetTurn() {
   app.cardContainers = [];
   app.selectedCards = [];
   app.cells = [];
   document.body.style.pointerEvents = 'auto';

}

function finishAndRestartGame() {
   let minutes = app.minutesLabel.textContent;
   let seconds = app.secondsLabel.textContent;

   window.alert(`Jogo terminado em: ${minutes}${seconds}! Gerando novo jogo...`);
   app.iniciar();
}

function disableMatchedCards() {
   app.cells.forEach(cell => {
      cell.removeEventListener("click", flipCard);
   })

   document.body.style.pointerEvents = 'auto';

   app.cards.pop();
   app.cards.pop();
}
 
function cardsMatch() {
   let firstSelectedCardId = app.selectedCards[0].id;
   let secondSelectedCardId = app.selectedCards[1].id;

   return firstSelectedCardId === secondSelectedCardId;
}

function hasNoCardsLeft() {
   return app.cards.length === 0;
}

function flipBackCards() {
   app.cardContainers.forEach(container => {
      container.classList.toggle("flipCard");
   })
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
   shuffleCards(cards);

   return cards;
}

function shuffleCards(cards) {
   for (let i = cards.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [cards[i], cards[j]] = [cards[j], cards[i]];
   }
}


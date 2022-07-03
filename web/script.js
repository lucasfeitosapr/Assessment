
// Objeto global para a aplicação
let app = {
   // Propriedades do objeto no formato par 'chave: valor'
   container: document.getElementById("container"),
   cards: loadCards(),
   // Classes do objeto
   iniciar: function () {
   },

};

(() => {
   
   // Chamar o método do objeto global
   app.iniciar();
   tableCreate();


})();


function flipCard() {


}

function tableCreate() {
   const body = document.body,
         tbl = document.createElement('table');
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

         td.addEventListener("click", function(e) {
            // console.log("cell clicked: ", this.cellIndex, "Row Index: ",  this.parentNode.rowIndex)
            const cell = e.target.closest('td');
            const row = cell.parentElement;

            // console.log(cell.querySelectorAll("div")[1].classList.toggle("flipCard"));
            
            cell.querySelector("div").classList.toggle("flipCard");

            // console.log()
            // console.log("card: ", cardContainer)
            // cardContainer.classList.toggle("flipCard");

            // console.log(cell.innerHTML, row.rowIndex, cell.cellIndex);


            // cell.querySelector('div').src = app.cards.find((card) => {
            //    console.log("Card id: ", card.id, "Img id: ", cell.querySelector('img').id)
            //    if(card.id.includes(cell.querySelector('img').id)) {
            //       console.log(card.path)
            //       return card;
            //    }
            // }).path;
            
         });
         


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
         count++;
     }
   }

   app.container.appendChild(tbl);
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


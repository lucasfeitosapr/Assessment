// Objeto global para a aplicação
let app = {
   // Propriedades do objeto no formato par 'chave: valor'
   container: document.getElementById("container"),

   // Classes do objeto
   iniciar: function () {
      console.log("Teste");
   },

};

(() => {
   
   // Chamar o método do objeto global
   app.iniciar();

})();


function tableCreate() {
   const body = document.body,
         tbl = document.createElement('table');
   tbl.style.width = '800px';
   tbl.style.height = '600px';
   tbl.style.border = '1px solid black';
   tbl.style.textAlign = 'center';
   
   //inserir as imagens aqui.
   for (let i = 0; i < 4; i++) {
     const tr = tbl.insertRow();
     for (let j = 0; j < 4; j++) {
       
         const td = tr.insertCell();
         td.appendChild(document.createTextNode(`Carta ${i}-${j}`));
         td.style.border = '1px solid black';

     }
   }
   app.container.appendChild(tbl);
 }
 
 tableCreate();


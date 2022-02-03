let baralho = ['<img src="Gifs/bobrossparrot.gif">'];

function carregarBaralho () {
  const carta = document.querySelector("main");
  for (let i = 0; i < baralho.length; i++) {
    carta.innerHTML = carta.innerHTML + `
    <div class="flip carta${i} card" onclick="fliparCarta('carta${i}')">
    <div class="face" id="front">
    <img src="Figuras/front.png">
    </div>
    <div class="face" id="back">
      ${baralho[i]}
    </div>
</div>`
  }
}

carregarBaralho ();


 
 /*Comandos de entrada de cartas */

/*let escolhecartas = prompt("Com quantas cartas quer jogar?"); 
while (escolhecartas > 14 || escolhecartas < 4 || escolhecartas%2 !== 0) {
    escolhecartas = prompt("Com quantas cartas quer jogar?"); 
}
  //Habilitar depoiss
// alert (escolhecartas);
/*
let cartasjogo = 6 - escolhecartas;
let aux = 1;
 while (cartasjogo > 0) {
    let removerCarta = document.querySelector("main .carta" + aux);
    removerCarta.classList.add("remove")
    aux = aux + 1;
    cartasjogo = cartasjogo - 1;
} */


function fliparCarta(flip){
const card = document.querySelector('.'+flip);
card.classList.toggle('flip');
}

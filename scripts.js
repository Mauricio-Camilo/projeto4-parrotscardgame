
let baralho = ['<img src="Gifs/bobrossparrot.gif">', '<img src="Gifs/explodyparrot.gif">', '<img src="Gifs/fiestaparrot.gif">', '<img src="Gifs/metalparrot.gif">', '<img src="Gifs/revertitparrot.gif">', '<img src="Gifs/tripletsparrot.gif">', '<img src="Gifs/unicornparrot.gif">'];
let viraCarta = "";
let memoriatexto = [];
let memoriacarta = [];

/*Comandos de entrada de cartas */
let escolhecartas = prompt("Quantas cartas você deseja? (números pares de 4 a 14)");
while (escolhecartas > 14 || escolhecartas < 4 || escolhecartas % 2 !== 0) {
  escolhecartas = prompt("Com quantas cartas quer jogar?");
}

/*Criar um novo array com as cartas dobradas e embaralhar*/

let baralhoJogo = [];
distruibuirCartas = escolhecartas / 2;
for (let i = 0; i < distruibuirCartas; i++) {
  baralhoJogo.push(baralho[i]);
  baralhoJogo.push(baralho[i]);
}
baralhoJogo.sort(comparador);
function comparador() {
  return Math.random() - 0.5;
}

function carregarBaralho() {
  const carta = document.querySelector("main");
  for (let i = 0; i < escolhecartas; i++) {
    carta.innerHTML = carta.innerHTML + `
    <div class="flip carta${i} card" onclick="fliparCarta('carta${i}')">
    <div class="face front">
    <img src="Figuras/front.png">
    </div>
    <div class="face back">
      ${baralhoJogo[i]}
    </div>
</div>`
  }
}

function fliparCarta(flip) {
  //Salva o nome da carta no array
  let cartaSalva = document.querySelector('.' + flip + ' .back');
  memoriatexto.push(cartaSalva.innerHTML);

  const card = document.querySelector('.' + flip);
  card.classList.toggle('flip');

  memoriacarta.push(flip);

// se clicar na mesma carta, retoma o jogo
  if (memoriacarta[1] !== undefined) {
    if (memoriacarta[0] === memoriacarta[1]){
      memoriacarta = [];
    }
  }


  if (memoriacarta[1] == undefined) {
   // pula o else
  }
  else {
    if (memoriatexto[0] !== memoriatexto[1]) {

     // setTimeout(contarUmsegundo,1000);
      for (let i = 0; i < 2; i++) {
        let reset = document.querySelector('.'+memoriacarta[i]);
        reset.classList.toggle('flip');
      }
         memoriatexto = [];
         memoriacarta = [];
    }
  
    // se acertar deve desabilitar o botão das cartas fixadas
    desabilitarFlip(memoriacarta[0]);
    desabilitarFlip(memoriacarta[1]);
    memoriatexto = [];
    memoriacarta = [];
  }

}


function desabilitarFlip(parametro) {
//  alert (parametro);
  let travaCarta = document.querySelector("." + parametro);
  //alert (travaCarta);
  travaCarta.classList.add("disable");
}

function contarUmsegundo() {
  alert ("contou 1 segundo");
  for (let i = 0; i < 2; i++) {
    
    viraCarta = memoriacarta[i];
    alert (viraCarta);
    
    let reset = document.querySelector('.'+viraCarta);
    reset.classList.toggle('flip');
  }
     memoriatexto = [];
     memoriacarta = [];
}


carregarBaralho();

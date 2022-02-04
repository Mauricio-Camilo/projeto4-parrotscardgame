
let baralho = ['<img src="Gifs/bobrossparrot.gif">', '<img src="Gifs/explodyparrot.gif">', '<img src="Gifs/fiestaparrot.gif">', '<img src="Gifs/metalparrot.gif">', '<img src="Gifs/revertitparrot.gif">', '<img src="Gifs/tripletsparrot.gif">', '<img src="Gifs/unicornparrot.gif">'];
let memoriaTexto = [];
let memoriaCarta = [];
let cartasSalvas = 0;
let quantidadeJogadas = 0;
let escolhecartas = 0;

function iniciarJogo() {
  escolhecartas = prompt("Quantas cartas você deseja? (números pares de 4 a 14)");
  while (escolhecartas > 14 || escolhecartas < 4 || escolhecartas % 2 !== 0) {
    escolhecartas = prompt("Quantas cartas você deseja? (números pares de 4 a 14)");
  }
  return (escolhecartas);
}

function comparador() {
  return Math.random() - 0.5;
}

function colocarCartas() {
  const carta = document.querySelector("main");
  carta.innerHTML = "";
  for (let i = 0; i < escolhecartas; i++) {
    carta.innerHTML = carta.innerHTML + `
    <div class="flip carta${i} card" onclick="fliparCarta('carta${i}')" data-identifier="card">
    <div class="face frente" data-identifier="front-face">
    <img src="Figuras/front.png">
    </div>
    <div class="face costas" data-identifier="back-face">
      ${baralhoJogo[i]}
    </div>
</div>`
  }
}

function escolherCartas() {
  let escolhecartas = prompt("Quantas cartas você deseja? (números pares de 4 a 14)");
  while (escolhecartas > 14 || escolhecartas < 4 || escolhecartas % 2 !== 0) {
    escolhecartas = prompt("Quantas cartas você deseja? (números pares de 4 a 14)");
  }
}

function fliparCarta(flip) {
  quantidadeJogadas++;
  let cartaSalva = document.querySelector('.' + flip + ' .costas');
  memoriaTexto.push(cartaSalva.innerHTML);
  const card = document.querySelector('.' + flip);
  card.classList.toggle('flip');
  memoriaCarta.push(flip);
  if (memoriaCarta[1] == undefined) {
    desabilitarFlip(memoriaCarta[0]);
  }
  else {
    if (memoriaTexto[0] !== memoriaTexto[1]) {
      habilitarFlip(memoriaCarta[0]);
      setTimeout(contarUmsegundo, 1000);
    }
    else {
      desabilitarFlip(memoriaCarta[0]);
      desabilitarFlip(memoriaCarta[1]);
      memoriaTexto = [];
      memoriaCarta = [];
      cartasSalvas++;
    }
    setTimeout(finalizarJogo, 500);
  }
}

function desabilitarFlip(desabilita) {
  let travaCarta = document.querySelector("." + desabilita);
  travaCarta.classList.add("disable");
}

function habilitarFlip(habilita) {
  let travaCarta = document.querySelector("." + habilita);
  travaCarta.classList.remove("disable");
}

function contarUmsegundo() {
  for (let i = 0; i < 2; i++) {
    let reset = document.querySelector('.' + memoriaCarta[i]);
    reset.classList.toggle('flip');
  }
  memoriaTexto = [];
  memoriaCarta = [];
}

function finalizarJogo() {
  if (cartasSalvas === distruibuirCartas) {
    alert("Você ganhou em " + quantidadeJogadas + " jogadas!");
  }
}

iniciarJogo();

let baralhoJogo = [];
distruibuirCartas = escolhecartas / 2;
for (let i = 0; i < distruibuirCartas; i++) {
  baralhoJogo.push(baralho[i]);
  baralhoJogo.push(baralho[i]);
}
baralhoJogo.sort(comparador);

colocarCartas();
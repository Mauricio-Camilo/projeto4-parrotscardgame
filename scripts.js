let baralho = ['<img src="Gifs/bobrossparrot.gif">', '<img src="Gifs/explodyparrot.gif">', '<img src="Gifs/fiestaparrot.gif">', '<img src="Gifs/metalparrot.gif">', '<img src="Gifs/revertitparrot.gif">', '<img src="Gifs/tripletsparrot.gif">', '<img src="Gifs/unicornparrot.gif">'];
let baralhoJogo = [];
let memoriaTexto = []; // Guarda o nome das cartas clicadas
let memoriaCarta = []; // Guarda a carta cliada atualmente
let cartasFinalizadas = [];
let quantidadeJogadas = 0;
let escolheCartas = 0;
let tempoDecorrido = 0; 
let intervalo = 0; // Variável usada para ser chamada pra contar o tempo

function iniciarJogo() {
  escolheCartas = prompt("Quantas cartas você deseja? (números pares de 4 a 14)");
  while (escolheCartas > 14 || escolheCartas < 4 || escolheCartas % 2 !== 0) {
    escolheCartas = prompt("Quantas cartas você deseja? (números pares de 4 a 14)");
  }
}

function embaralharCartas() {
  distruibuirCartas = escolheCartas / 2;
  for (let i = 0; i < distruibuirCartas; i++) {
    baralhoJogo.push(baralho[i]);
    baralhoJogo.push(baralho[i]);
  }
  baralhoJogo.sort(comparador);
}

function comparador() {
  return Math.random() - 0.5;
}

function aumentarTempo() {
  tempoDecorrido++;
  document.querySelector(".tempo").innerHTML = tempoDecorrido;
}

// As cartas renderizadas recebem como classe o nome das imagens, para fazer as comparações do jogo.
function colocarCartas() {
  const carta = document.querySelector("main");
  carta.innerHTML = "";
  for (let i = 0; i < escolheCartas; i++) {
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

function fliparCarta(carta) { 
  quantidadeJogadas++;
  let cartaSalva = document.querySelector('.' + carta + ' .costas');
  memoriaTexto.push(cartaSalva.innerHTML); /* Salva o nome da carta num array, para fazer comparação com a próxima carta clicada */
  const card = document.querySelector('.' + carta);
  card.classList.toggle('flip');
  memoriaCarta.push(carta); /* Salva o número da carta clicada em um array */
  if (memoriaCarta[1] == undefined) { /* Essa condição verifica se está clicando na primeira ou na segunda carta */
    desabilitarFlip(memoriaCarta[0]); // Para o primeiro clique, desabilita a carta clicada
  }
  else {
    compararCartasClicadas(); // Para o segundo clique, deve comparar as cartas
  }
}

/* As duas funções abaixo recebem o nome da carta para procurá-la para executar a ação */

function desabilitarFlip(desabilita) {
  let travaCarta = document.querySelector("." + desabilita);
  travaCarta.classList.add("disable");
}

function habilitarFlip(habilita) {
  let destravaCarta = document.querySelector("." + habilita);
  destravaCarta.classList.remove("disable");
}

function compararCartasClicadas() {
  if (memoriaTexto[0] !== memoriaTexto[1]) {  /* Se as cartas forem diferentes, desabilita todos os cliques e conta 1 segundo */
    let i = 0;
    while (i < escolheCartas) {
      desabilitarFlip("carta" + i);
      i++;
    }
    setTimeout(contarUmsegundo, 1000);
  }
  else { 
    concluirJogada(); // Para cartas iguais, deve concluir a jogada
  }
  setTimeout(finalizarJogo, 500);
}

function contarUmsegundo() {
  for (let i = 0; i < 2; i++) {
    let reset = document.querySelector('.' + memoriaCarta[i]);
    reset.classList.toggle('flip'); // Depois de 1 segundo, desvira as cartas clicadas
  }
  memoriaTexto = []; // Zerar os arrays auxiliares que recebem as cartas selecionadas
  memoriaCarta = [];
  for (let i = 0; i < escolheCartas;  i++) { habilitarFlip("carta" + i); } // Reabilita todas as cartas do jogo
  for (let j = 0; j < escolheCartas;  j++) { desabilitarFlip(cartasFinalizadas[j]); } // Trava as cartas já finalizadas
}

function concluirJogada() {
    desabilitarFlip(memoriaCarta[0]); // Trava o par de cartas selecionadas
    desabilitarFlip(memoriaCarta[1]); 
    cartasFinalizadas.push(memoriaCarta[0]); // Salva o par de cartas selecionadas
    cartasFinalizadas.push(memoriaCarta[1]);
    memoriaTexto = []; // Zera os arrays para receber novas cartas a serem selecionadas
    memoriaCarta = [];
}

function finalizarJogo() {
  if (cartasFinalizadas.length/2 === distruibuirCartas) {
    alert(`Você ganhou em ${quantidadeJogadas} jogadas e ${tempoDecorrido} segundos`)
    const resposta = prompt("Deseja jogar novamente? Digite y para sim e qualquer outra tecla para não");
    if (resposta === "y") location.reload();
    else {
      alert("Obrigado por jogar conosco")
    }
  }
}

iniciarJogo();
embaralharCartas();
colocarCartas();
intervalo = setInterval(aumentarTempo, 1000); // iniciar contagem
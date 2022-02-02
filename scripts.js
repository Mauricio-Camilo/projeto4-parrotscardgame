
 /*Comandos de entrada de cartas */

let escolhecartas = prompt("Com quantas cartas quer jogar?"); 
/*while (cartas > 14  || cartas < 2) {
    cartas = prompt("Com quantas cartas quer jogar?"); 

} */ //Habilitar depois
// alert (escolhecartas);

let cartasjogo = 14 - escolhecartas;
let aux = 1;
// alert (cartasjogo);
 while (cartasjogo > 0) {
    let removerCarta = document.querySelector(".carta" + aux);
    removerCarta.classList.add("remove")
    aux = aux + 1;
    cartasjogo = cartasjogo - 1;
} 

function virarCarta(parametro) {
    let flip = document.querySelector("."+parametro )
    flip.classList.add("verde");
}
//variáveis do campo
let width = 600;
let height = 400;

//velocidade de velocidade
let velocidadePadrao = 5;
let velocidadeXBolinha = velocidadePadrao;
let velocidadeYBolinha = velocidadePadrao + 1;
let velocidadeDaRaquete = velocidadePadrao + 2;

//variáveis da bolinha
let xBolinha = width/2;
let yBolinha = height/2;
let diametro = 20;
let raio = diametro / 2 ;

//variáveis da raquete
let raqueteLargura = 10
let raqueteAltura = 90;
let xRaqueteJogador1 = 2;
let yRaqueteJogador1 = (height/2) - (raqueteAltura/2);
let xRaqueteJogador2 = width - xRaqueteJogador1 - raqueteLargura;
let yRaqueteJogador2 = (height/2) - (raqueteAltura/2);
let colidiuF1 = false;
let colidiuF2 = false;
let colidiuS1 = false;
let colidiuS2 = false;
let colidiuI1 = false;
let colidiuI2 = false;

//variáveis do jogo
let pontosJogador1 = 0;
let pontosJogador2 = 0;

//sons do jogo
let ponto;
let raquetada;
let trilha;

function preload(){
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  trilha = loadSound("trilha.mp3");
}

function setup() {
  createCanvas(width, height);
  trilha.loop();
}

function mostraBolinha(){
  fill('white');
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio >= width){
      velocidadeXBolinha *= -1;
      pontosJogador1++;
      ponto.play();
  } else if (xBolinha - raio <= 0){
      velocidadeXBolinha *= -1;
      pontosJogador2++;
      ponto.play();
  } else if (yBolinha + raio >= height){
      velocidadeYBolinha *= -1;
  } else if (yBolinha - raio <= 0){
      velocidadeYBolinha *= -1;
  }
}

function mostraRaqueteJogador1(){
  fill('blue');
  rect(xRaqueteJogador1, yRaqueteJogador1, raqueteLargura, 
       raqueteAltura);
}

function mostraRaqueteJogador2(){
  fill('yellow');
  rect(xRaqueteJogador2, yRaqueteJogador2, raqueteLargura, 
       raqueteAltura);
}

function movimentaRaqueteJogador1(){
  if (keyIsDown(SHIFT)){
      yRaqueteJogador1 -= (velocidadePadrao + 2);
  }
  if (keyIsDown(CONTROL)){
      yRaqueteJogador1 += (velocidadePadrao + 2);
  }
}

function movimentaRaqueteJogador2(){
  if (keyIsDown(UP_ARROW)){
      yRaqueteJogador2 -= (velocidadePadrao + 2);
  }
  if (keyIsDown(DOWN_ARROW)){
      yRaqueteJogador2 += (velocidadePadrao + 2);
  }
}

function verificaColisaoFrontalRaqueteJogador1(){
  colidiuF1 = collideRectCircle(xRaqueteJogador1, yRaqueteJogador1, raqueteLargura, raqueteAltura, xBolinha, yBolinha, diametro);
  if (colidiuF1){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoFrontalRaqueteJogador2(){
  colidiuF2 = collideRectCircle(xRaqueteJogador2, yRaqueteJogador2, xRaqueteJogador2, raqueteAltura, xBolinha, yBolinha, diametro);
  if (colidiuF2){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
/*
function verificaColisaoSuperiorRaqueteJogador1(){
  colidiuS1 = collideRectCircle(xRaqueteJogador1, yRaqueteJogador1 + raqueteAltura , raqueteAltura, raqueteLargura, yBolinha, xBolinha, diametro);
  if (colidiuS1){
    velocidadeYBolinha *= -1;
  }
}

function verificaColisaoSuperiorRaqueteJogador2(){
  colidiuS2 = collideRectCircle(xRaqueteJogador2, yRaqueteJogador2, xRaqueteJogador2, raqueteAltura, xBolinha, yBolinha, diametro);
  if (colidiuS2){
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoInferiorRaqueteJogador1(){
  colidiuI1 = collideRectCircle(xRaqueteJogador1, yRaqueteJogador1, raqueteLargura, raqueteAltura, xBolinha, yBolinha, diametro);
  if (colidiuI1){
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoInferiorRaqueteJogador2(){
  colidiuI2 = collideRectCircle(xRaqueteJogador2, yRaqueteJogador2, xRaqueteJogador2, raqueteAltura, xBolinha, yBolinha, diametro);
  if (colidiuI2){
    velocidadeXBolinha *= -1;
  }
}
*/

function placarJogador1(){
  textAlign(CENTER);
  textSize(width*0.03);
  fill('blue');
  text('Jogador 1',width*0.3, width*0.03 );
  text(pontosJogador1, width*0.3, width*0.07);
}

function placarJogador2(){
  textAlign(CENTER);
  textSize(width*0.03);
  fill('yellow');
  text('Jogador 2',width*0.7, width*0.03 );
  text(pontosJogador2, width*0.7, width*0.07);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaqueteJogador1();
  mostraRaqueteJogador2();
  movimentaRaqueteJogador1();
  movimentaRaqueteJogador2();
  verificaColisaoFrontalRaqueteJogador1();
  verificaColisaoFrontalRaqueteJogador2();
  //verificaColisaoSuperiorRaqueteJogador1();
  //verificaColisaoSuperiorRaqueteJogador2();
  //verificaColisaoInferiorRaqueteJogador1();
  //verificaColisaoInferiorRaqueteJogador2();
  placarJogador1();
  placarJogador2();

}

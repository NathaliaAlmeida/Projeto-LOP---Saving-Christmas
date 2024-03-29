// variaveis
//tela
var telaX = 800;
var telaY = 460;

//tela de informacoes
var vidas = 3;
var pontuacao = 0;
var nivel = 1;
var balas = 7;
let tempoJogo = 10;
var tempoJogado = 0;
let tempoAtirar = 3;

var fimJogo = false;
var podeAtirar = true;
var carregandoBalas = false;

var personagem;
var obstaculo;
var obstaculoArray = new Array();
var balaArray = new Array();
var atirar;
var fundo;
var novatela;
var doce;

var ghost;
var stars;
var vida;

var impacto = false;
var xx = 380;
var yy = 80;
var mostrapresente = true;
var mostraAmigo = false;
var para = false;
var nivelTres = false;
var trenoX = 850;
var trenoY = 140;
var friend;
var friendY = 340;
var mostrarChefao = false;
let subiu = false;;
var boss;
var ultimaFase = false;
var contagemHits = 0;
var ativarVida = false;
var cloudX = 750;
var telaInicial = true;
var jackAttacks;
var cx = 0;
var cy = 300;
var cr = 50;
var speed = 5;
var customFill = 0;
var pause = true;
var pauseImage;
var gameOverImgage;
var wins;
var angle = 0;
var ghost_movement;
var ghost_movement2;
var boss_appears;
var boss_appear2;
var Natal_8;
var play = false;
var playBoss = false;
var idle = [];
let temp = 1;
let temp_right = 1;
let temp_left = 1;
var movendo = false;
var run_right = [];
var run_left = [];

function preload() {
  fundo = loadImage('assets/img/fundo.png');
  doce = loadImage('/assets/img/doce.png');
  biscoito = loadImage('/assets/img/biscoito.png');
  ghost = loadImage('/assets/img/ghost2.png');
  ghost2 = loadImage('/assets/img/ghost2_right.png');
  stars = loadImage('/assets/img/stars.png');
  floorLeft = loadImage('/assets/img/floor_left.png');
  floorCenter = loadImage('/assets/img/floor_center.png');
  floorRight = loadImage('/assets/img/floor_right.png');
  sing = loadImage('/assets/img/sign.png');
  presente = loadImage('/assets/img/presente.png');
  treno = loadImage('/assets/img/treno.png');
  friend = loadImage('/assets/img/rena.png');
  boss = loadImage('/assets/img/boss.png');
  cloud = loadImage('/assets/img/cloud.png');
  jackAttacks = loadImage('/assets/img/tela1.png');
  pauseImage = loadImage('/assets/img/pause.png');
  wins = loadImage('/assets/img/wins.png');
  gameOverImgage = loadImage('/assets/img/game_over.png');
  ghost_movement = loadSound('/assets/sounds/ghost_movement.wav');
  ghost_movement2 = loadSound('/assets/sounds/ghost_movement2.wav');
  boss_appears = loadSound('/assets/sounds/boss_appears.wav');
  boss_appears2 = loadSound('/assets/sounds/boss_appears2.mp3');
  Natal_8 = loadSound('/assets/sounds/Natal_8.mp3');

  for (var i = 1; i <= 10; i++) {
    idle[i] = loadImage('/assets/img/animacao/Idle(' + i + ').png');
  }

  for (var i = 1; i <= 8; i++) {
    run_right[i] = loadImage('/assets/img/animacao/Run(' + i + ').png');
  }

  for (var i = 1; i <= 8; i++) {
    run_left[i] = loadImage('/assets/img/animacao/run_left_' + i + '.png');
  }
}

function setup() {
  // funcao setup eh iniciada apenas uma vez
  personagem = new Personagem();

  obstaculoArray.push(new Obstaculo(900, 350, ghost));
  obstaculoArray[0].display();

  novatela = createCanvas(telaX, telaY);
  novatela.parent('sketch-holder');
  vida = new Vida(random(50, 700), random(40, 100));

  Natal_8.setVolume(0.1);
  Natal_8.play();
}

function draw() {
  frameRate(30);
  if (telaInicial) {
    background(0);
    image(jackAttacks, 110, 150, 500, 100);
    fill(customFill);
    text('pressione a telca ENTER para iniciar', width / 2, 350);
    customFill++;
    if (customFill > 255) {
      customFill = 0;
    }
  } else {
    Natal_8.stop();

    ghostSound(play);

    background(fundo);

    base();

    temp++;
    temp_right++;
    temp_left++;

    if (!movendo) {
      personagem.display(idle[temp]);
    }

    if (temp >= 10) {
      temp = 1;
    }

    if (temp_right >= 8) {
      temp_right = 1;
    }
    if (temp_left >= 8) {
      temp_left = 1;
    }

    if (obstaculoArray.length > 0) {
      if (nivel == 1 && obstaculoArray[0].posicaoX == 790) {
        play = true;
      }
    }

    nivel1();

    nivel3();

    nivel4();

    nivel5();

    colisaoPersonagemPlaca();

    mostraEstrelas();

    contagemRegressiva();

    movimentacaoPersonagem();

    movimentacaoObstaculos();

    poderFogo();

    indicadoresInformacao();

    colisaoBalaObstaculo();

    colisaoObstaculoPersonagem();

    colisaoPersonagemVida();

    colisaoPersonagemCaixa();

    colisaoPersonagemAmigo();

    if (frameCount % 500 == 0) {
      ativarVida = true;
    }

    if (frameCount % 300 == 0 && nivel == 5) {
      playBoss = true;
    }

    nivel2();

    mostraVida();
  }

  if (!pause && !telaInicial) {
    push();
    fill(0);
    noStroke();
    imageMode(CENTER);
    rect(0, 0, width, height);
    image(jackAttacks, 200, 75, 300, 60);
    image(pauseImage, width / 2, height / 2, 70, 20);
    pop();
  }

  finalJogo();
}

function nivel1() {
  if (nivel > 1) {
    push();
    imageMode(CENTER);
    if (nivel < 5) {
      image(sing, 750, 350, 90, 80);
    }
    image(treno, trenoX, trenoY, 80, 80);
    pop();
    trenoX -= 1.3;
  }
}

function nivel2() {
  if (nivel == 2) {
    if (!para) {
      for (var i = 0; i < 3; i++) {
        obstaculoArray.push(new Obstaculo(random(700, 900), random(100, 350), ghost));
      }
      play = true;
      para = true;
    }
    if (impacto) {
      telaGameOver();
      gameOVer();
    }
  }
}

function nivel3() {
  if (nivel == 3) {
    if (mostrapresente) {
      push();
      imageMode(CENTER);
      image(presente, 400, 360, 60, 60);
      pop();
    }
  }
  if (nivel == 3) {
    if (!para) {
      for (var i = 0; i < 3; i++) {
        obstaculoArray.push(new Obstaculo(random(-50, 50), random(100, 350), ghost2));
      }
      para = true;
    }
    if (contagemHits > 2) {
      telaGameOver();
      gameOVer();
    }
  }
}

function nivel4() {
  if (nivel == 4) {
    if (mostraAmigo) {
      push();
      imageMode(CENTER);
      image(friend, 100, friendY, 105, 120);
      pop();
    }

    if (!para) {
      for (var i = 0; i < 3; i++) {
        obstaculoArray.push(new Obstaculo(random(700, 900), random(100, 350), ghost));
      }
      para = true;
    }

    if (contagemHits > 3) {
      telaGameOver();
      gameOVer();
    }
  }
}

function nivel5() {
  if (nivel == 5) {
    if (!ultimaFase) {
      tempoJogo = 30;
      balas = 11;
      ultimaFase = true;
      playBoss = true;
    }
    push();
    imageMode(CENTER);
    image(friend, 100, friendY, 105, 120);
    pop();
    if (frameCount % 200 == 0) {
      geraFantasmas();
    }
    friendY -= 3;
  }
}

//definindo caracteristicas do personagem
function Personagem() {
  this.tamanhoX = 100;
  this.tamanhoY = 120;
  this.posicaoX = 90;
  this.posicaoY = 345;
  this.velocidade = 1;

  this.display = function(sprite) {
    push();
    imageMode(CENTER);
    image(sprite, this.posicaoX, this.posicaoY, this.tamanhoY, this.tamanhoX);
    pop();
  }
};

//definindo caracteristicas do obstaculo
function Obstaculo(posicaoX, posicaoY, sprite) {
  this.posicaoX = posicaoX;
  this.posicaoY = posicaoY;
  this.tamanhoX = 80;
  this.tamanhoY = 70;
  this.vidas = 2;

  if (nivel == 1) {
    this.velocidade = 1;
    this.tint = 255;
    this.vidas = 2;
  } else if (nivel == 2) {
    this.velocidade = random(2, 3);
    this.tint = random(140, 200);
    this.vidas = 3;
  } else if (nivel == 5) {
    this.tamanhoX = 480;
    this.tamanhoY = 350;
    this.vidas = 11;

    if (obstaculoArray.length > 0) {
      this.tamanhoX = 80;
      this.tamanhoY = 70;
      this.tint = random(30, 190);
      this.vidas = 2;
    }
  } else {
    this.velocidade = random(4, 6);
    this.tint = random(30, 190);
    this.vidas = random(3, 4);
  }
  this.display = function() {
    push();
    tint(255, this.tint);
    image(sprite, this.posicaoX, this.posicaoY, this.tamanhoY, this.tamanhoX);
    pop();
  }
};

function Bala(posicaoX, posicaoY) {
  if (nivel == 3) {
    this.posicaoX = posicaoX - 20;
  } else {
    this.posicaoX = posicaoX + 20;
  }
  this.posicaoY = posicaoY;
  this.tamanhoX = 40;
  this.tamanhoY = 40;

  this.display = function() {
    push();
    translate(this.posicaoX, this.posicaoY);
    rotate(angle);
    imageMode(CENTER);
    image(doce, 0, 0, this.tamanhoX, this.tamanhoY);
    angle += 0.1;
    cx += 2;
    pop();
  }
};

function Vida(posicaoX, posicaoY) {
  this.posicaoX = posicaoX + 20;
  this.posicaoY = posicaoY;
  this.tamanhoX = 30;
  this.tamanhoY = 30;

  this.display = function() {
    imageMode(CENTER);
    tint(255, 180);
    image(biscoito, this.posicaoX, this.posicaoY, this.tamanhoX, this.tamanhoY);
  }
};

function mousePressed() {
  if (podeAtirar) {
    atirar = true;
    balaArray.push(new Bala(personagem.posicaoX, personagem.posicaoY));
    balas--;
  }
  if (fimJogo) {
    atirar = false;
    podeAtirar = false;
  }
}

function indicadoresInformacao() {
  fill(255, 255, 255);
  text('VIDAS: ' + vidas, 10, 30);
  text('DOCES: ' + balas, 90, 30);
  text('PONTOS: ' + pontuacao, 170, 30);
  text('NIVEL: ' + nivel, 280, 30);
  text("TEMPO: " + tempoJogo, 360, 30);
}

function contagemRegressiva() {
  if (frameCount % 60 == 0 && tempoJogo > 0) {
    tempoJogo--;
    tempoJogado++;
  }

  if (frameCount % 60 == 0 && tempoAtirar != 0 && podeAtirar == false) {
    tempoAtirar--;
    carregandoBalas = true;
  }
}

function movimentacaoPersonagem() {
  // faz personagem andar para esquerda quando seta do teclado pessionada
  if (keyIsDown(LEFT_ARROW)) {
    movendo = true;
    personagem.display(run_left[temp_left]);
    personagem.posicaoX -= 4;
  }
  // faz personagem andar para direita quando seta do teclado pessionada
  if (keyIsDown(RIGHT_ARROW)) {
    movendo = true;
    personagem.display(run_right[temp_right]);
    personagem.posicaoX += 4;
  }
}

function keyReleased() {
  movendo = false;
}

function movimentacaoObstaculos() {
  if (nivel == 3) {
    for (var i = 0; i < obstaculoArray.length; i++) {
      obstaculoArray[i].display();
      obstaculoArray[i].posicaoY += random(-2, 2);
      obstaculoArray[i].posicaoX += obstaculoArray[i].velocidade;
    }
  } else if (nivel == 5) {
    obstaculoArray[0].display();
    if (!subiu) {
      obstaculoArray[0].posicaoY -= 1;
      if (obstaculoArray[0].posicaoY == 50) {
        subiu = true;
      }
    } else if (subiu) {
      obstaculoArray[0].posicaoY += 1;
      if (obstaculoArray[0].posicaoY == 400) {
        subiu = false;
      }
    }
    for (var i = 1; i < obstaculoArray.length - 1; i++) {
      obstaculoArray[i].display();
      obstaculoArray[i].posicaoY += random(-2, 2);
      obstaculoArray[i].posicaoX -= 1;
    }
  } else {
    for (var i = 0; i < obstaculoArray.length; i++) {
      obstaculoArray[i].display();
      obstaculoArray[i].posicaoY += random(-2, 2);
      obstaculoArray[i].posicaoX -= obstaculoArray[i].velocidade;
    }
  }

  resetaMovimentacaoObstaculo();
}

function resetaMovimentacaoObstaculo() {
  for (var i = 0; i < obstaculoArray.length; i++) {
    if (obstaculoArray[i].posicaoX < -120) {
      obstaculoArray[i].posicaoX = random(400, 800);
      obstaculoArray[i].posicaoY = random(100, 400);
      obstaculoArray[obstaculoArray.length - 1].velocidade += 1;
    }
  }
}

function colisaoBalaObstaculo() {
  if (balaArray.length > 0) {
    for (var i = 0; i < balaArray.length; i++) {
      for (var j = 0; j < obstaculoArray.length; j++) {
        let hit;
        if (nivel == 5) {
          hit = collideRectRect(
            obstaculoArray[j].posicaoX,
            obstaculoArray[j].posicaoY,
            obstaculoArray[j].tamanhoX - 5,
            obstaculoArray[j].tamanhoY - 10,
            balaArray[i].posicaoX,
            balaArray[i].posicaoY,
            balaArray[i].tamanhoX,
            balaArray[i].tamanhoY
          );
        } else {
          hit = collideRectRect(
            obstaculoArray[j].posicaoX,
            obstaculoArray[j].posicaoY,
            obstaculoArray[j].tamanhoX - 5,
            obstaculoArray[j].tamanhoY - 10,
            balaArray[i].posicaoX,
            balaArray[i].posicaoY,
            balaArray[i].tamanhoX,
            balaArray[i].tamanhoY
          );
        }
        if (hit) {
          play = false;
          obstaculoArray[j].vidas--;
          balaArray.splice(i, 1);
          for (var k = 0; k < obstaculoArray.length; k++) {
            if (nivel == 5) {
              if (obstaculoArray[0].vidas == 0) {
                push();
                fill(0);
                noStroke();
                imageMode(CENTER);
                rect(0, 0, width, height);
                image(jackAttacks, 200, 75, 300, 60);
                tint(50);
                image(boss, 550, 230, 400, 535);
                tint(255, 255);
                image(wins, width / 2, height / 2, 300, 60);
                pop();
                fimJogo = true;
                noLoop();
              }
            }
            if (obstaculoArray[k].vidas == 0) {
              pontuacao++;
              obstaculoArray.splice(k, 1);
            }
          }
        } // fim if
        if (balaArray.length == 0) {
          break;
        }
      } // fim for
    } // fim for
  } // fim if

  if (nivel == 1 && obstaculoArray.length == 0) {
    nivel = 2;
    tempoJogo += 8;
    vidas++;
  }
} // fim function

function colisaoPersonagemVida() {
  let hit = collideRectRect(
    personagem.posicaoX,
    personagem.posicaoY,
    personagem.tamanhoX,
    personagem.tamanhoX,
    vida.posicaoX,
    vida.posicaoY,
    vida.tamanhoX,
    vida.tamanhoY);
  if (hit) {
    vidas += 1;
    vida.posicaoY = -100;
    ativarVida = false;
  } // fim if
} // fim function

function colisaoObstaculoPersonagem() {
  for (var i = 0; i < obstaculoArray.length; i++) {
    let hit = collideRectRect(
      obstaculoArray[i].posicaoX,
      obstaculoArray[i].posicaoY,
      obstaculoArray[i].tamanhoX - 30,
      obstaculoArray[i].tamanhoX,

      personagem.posicaoX,
      personagem.posicaoY,
      personagem.tamanhoX - 50,
      personagem.tamanhoY - 10);
    if (hit) {
      if (nivel > 1) {
        impacto = true;
      }
      vidas--;
      obstaculoArray.splice(i, 1);
    } // fim if
  } // fim for
}

function colisaoPersonagemPlaca() {
  let hit = collideRectRect(
    personagem.posicaoX,
    personagem.posicaoY,
    personagem.tamanhoX - 30,
    personagem.tamanhoY,

    750,
    360,
    60,
    80);
  if (hit && !nivelTres) {
    nivel = 3;
    tempoJogo += 6;
    nivelTres = true;
    para = false;
    while (obstaculoArray.length > 0) {
      obstaculoArray.pop();
    }
  } // fim if
}

function colisaoPersonagemCaixa() {
  let hit = collideRectCircle(personagem.posicaoX, personagem.posicaoY, 50, 50, 400, 360, 50);
  if (hit && nivel == 3) {
    nivel = 4;
    tempoJogo += 4;
    para = false;
    mostrapresente = false;
    mostraAmigo = true;
    while (obstaculoArray.length > 0) {
      obstaculoArray.pop();
    }
    while (balaArray.length > 0) {
      balaArray.pop();
    }
  }
}

function colisaoPersonagemAmigo() {
  let hit = collideRectCircle(personagem.posicaoX, personagem.posicaoY, 50, 50, 100, friendY, 90);
  if (hit && nivel == 4) {
    nivel = 5;
    para = false;
    mostrapresente = false;
    mostraAmigo = true;
    mostrarChefao = true;
    while (obstaculoArray.length > 0) {
      obstaculoArray.pop();
    }
    while (balaArray.length > 0) {
      balaArray.pop();
    }
    obstaculoArray.push(new Obstaculo(730, 250, boss));
  }
}

function finalJogo() {
  fill(255, 255, 255);

  if (vidas == 0) {
    telaGameOver();
    gameOVer();
  }

  if (tempoJogo == 0) {
    telaGameOver();
    gameOVer();
  }
}

function gameOVer() {
  fimJogo = true;
  noLoop();
}

function poderFogo() {
  for (var i = 0; i < balaArray.length; i++) {
    balaArray[i].display();
    if (nivel == 3) {
      balaArray[i].posicaoX -= 5;
      if (balaArray[i].posicaoX <= 0) {
        balaArray.splice(i, 1);
      }
    } else {
      balaArray[i].posicaoX += 5;
      if (balaArray[i].posicaoX > 800) {
        balaArray.splice(i, 1);
      }
    }
  }

  if (balas == 0) {
    podeAtirar = false;
  }

  if (carregandoBalas) {
    fill(255, 0, 0);
    text("R E C A R R E G A N D O ... " + tempoAtirar, 450, 30);
  }

  if (tempoAtirar == 0) {
    podeAtirar = true;
    tempoAtirar = 4;
    balas = 7;
  }

  if (tempoAtirar == 4) {
    carregandoBalas = false;
  }
}

function mostraEstrelas() {
  imageMode(CENTER);
  image(stars, xx, yy, 850, 450);
  image(cloud, cloudX, yy + 50, 850, 450);
  cloudX -= 0.4;
  xx -= 0.03;
}

function base() {
  push();
  imageMode(CENTER);
  image(floorLeft, 70, 425, 100, 70);
  for (var i = 170; i < 731; i += 100) {
    image(floorCenter, i, 425, 100, 70);
  }

  image(floorRight, 730, 425, 100, 70);
  pop();  
}

function mostraVida() {
  if (!fimJogo) {
    if (ativarVida) {
      vida.display();
      vida.posicaoY += 1;
      if (vida.posicaoY > 400) {
        vida.posicaoY = -111;
        ativarVida = false;
      }
    }
  }
}

function geraFantasmas() {
  obstaculoArray.push(new Obstaculo(obstaculoArray[0].posicaoX, obstaculoArray[0].posicaoY, ghost));
}

function keyPressed() {
  if (keyCode === ENTER) {
    telaInicial = false;
  } else if (keyCode === 27) {
    if (pause && !telaInicial) {
      pause = false;
      noLoop();
    } else {
      pause = true;
      background(0);
      loop();
    }
  }
  return false;
}

function telaGameOver() {
  push();
  fill(0);
  noStroke();
  imageMode(CENTER);
  rect(0, 0, width, height);
  image(jackAttacks, 200, 75, 300, 60);
  tint(255, 255);
  image(boss, 550, 230, 400, 535);
  fill(255);
  image(gameOverImgage, width / 2, height / 2, 300, 60);
  pop();
}

function ghostSound() {
  if (play) {
    ghost_movement.setVolume(0.1);
    ghost_movement.play();
    play = false;
  }

  if (playBoss) {
    boss_appears.setVolume(0.099);
    boss_appears.play();
    playBoss = false;
  }
}

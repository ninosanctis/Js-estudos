// definindo tamanho da tela

var altura = 0
var largura = 0
var vidas = 1
var tempo = 10
var tempoMosquito = 1500

var dificuldade = window.location.search
dificuldade = dificuldade.replace("?", "")

if (dificuldade === "facil") {
  //1500
  var tempoMosquito = 1500
} else if (dificuldade === "medio") {
  //1000
  var tempoMosquito = 1000
} else if (dificuldade === "dificil") {
  //750
  var tempoMosquito = 750
}

function ajustarTamanho() {
  altura = window.innerHeight
  largura = window.innerWidth
  console.log(largura, altura)
}

ajustarTamanho()

var cronometro = setInterval(function () {
  tempo -= 1

  if (tempo < 0) {
    clearInterval(cronometro)
    clearInterval(criaMosquito)
    window.location.href = "vitoria.html"
  } else {
    document.getElementById("cronometro").innerHTML = tempo
  }
}, 1000)

// definindo posição aleatoria
function posicaoRandom() {
  // remover o mosquito anterior(caso exista)
  if (document.getElementById("mosquito")) {
    document.getElementById("mosquito").remove()

    if (vidas > 3) {
      window.location.href = "fim_de_jogo.html"
    }

    document.getElementById("v" + vidas).src = "./assets/coracao_vazio.png"

    vidas++
  }

  var posicaoX = Math.floor(Math.random() * largura) - 90
  var posicaoY = Math.floor(Math.random() * altura) - 90

  posicaoX = posicaoX < 0 ? 0 : posicaoX
  posicaoY = posicaoY < 0 ? 0 : posicaoY

  console.log(posicaoX, posicaoY)

  // Criar o elemento HTML
  var mosquito = document.createElement("img")
  mosquito.src = "./assets/mosca.png"
  mosquito.className = tamanhoRandom() + " " + ladoRandom()
  mosquito.style.left = posicaoX + "px"
  mosquito.style.top = posicaoY + "px"
  mosquito.style.position = "absolute"
  mosquito.id = "mosquito"
  mosquito.onclick = function () {
    this.remove()
  }

  document.body.appendChild(mosquito)
  console.log(ladoRandom())
  console.log(tamanhoRandom())
}

// definindo tamanho aleatorio
function tamanhoRandom() {
  var classe = Math.floor(Math.random() * 3)

  // switch (classe) {
  //   case 0:
  //     return "mosquito1"

  //   case 1:
  //     return "mosquito2"

  //   case 2:
  //     return "mosquito3"
  // }

  if (classe === 0) {
    return "mosquito1"
  } else if (classe === 1) {
    return "mosquito2"
  } else {
    return "mosquito3"
  }
}

// definindo lado aleatorio
function ladoRandom() {
  var classe = Math.floor(Math.random() * 2)

  switch (classe) {
    case 0:
      return "ladoA"
    case 1:
      return "ladoB"
  }
}

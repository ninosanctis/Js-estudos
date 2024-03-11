class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }

  validarDados() {
    for (let i in this) {
      if (this[i] === undefined || this[i] === "" || this[1] === null) {
        return false
      }
    }
    return true
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem("id")
    if (id === null) {
      localStorage.setItem("id", 0)
    }
  }

  getNextId = () => {
    let proximoId = localStorage.getItem("id")
    return parseInt(proximoId) + 1
  }

  gravar = (d) => {
    let id = this.getNextId()

    localStorage.setItem(id, JSON.stringify(d))

    localStorage.setItem("id", id)
  }

  recuperarTodosRegistros = () => {
    let despesas = []

    let id = localStorage.getItem("id")

    for (let i = 1; i <= id; i++) {
      let despesa = JSON.parse(localStorage.getItem(i))

      if (despesa === null) {
        continue
      }

      despesas.push(despesa)
    }

    return despesas
  }
}

let bd = new Bd()

cadastrarDespesa = () => {
  let ano = document.getElementById("ano")
  let mes = document.getElementById("mes")
  let dia = document.getElementById("dia")
  let tipo = document.getElementById("tipo")
  let descricao = document.getElementById("descricao")
  let valor = document.getElementById("valor")

  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  )

  if (despesa.validarDados()) {
    $("#registroDespesa").modal("show")
    bd.gravar(despesa)
    document.getElementById("tituloModal").innerHTML = "Cadastrado com Sucesso"
    document.getElementById("conteudoModal").innerHTML =
      "Despesa cadastrada com sucesso"
    document.getElementById("corMudar").className = "modal-header text-success"
    document.getElementById("botaoFechar").innerHTML = "Fechar"
    document.getElementById("botaoFechar").className = "btn btn-success"
  } else {
    $("#registroDespesa").modal("show")
    document.getElementById("tituloModal").innerHTML = "Dados Invalidos"
    document.getElementById("corMudar").className = "modal-header text-danger"
    document.getElementById("conteudoModal").innerHTML =
      "Preencha todos os campos"
    document.getElementById("botaoFechar").innerHTML = "Voltar e corrigir"
    document.getElementById("botaoFechar").className = "btn btn-danger"
  }
}

carregaListaDespesa = () => {
  let despesas = []
  despesas = bd.recuperarTodosRegistros()

  let listaDespesas = document.getElementById("listaDespesas")

  despesas.forEach(function (d) {
    // criando a linha (tr)
    let linha = listaDespesas.insertRow()

    // inserir valores
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
    linha.insertCell(1).innerHTML = d.tipo
    linha.insertCell(2).innerHTML = d.descricao
    linha.insertCell(3).innerHTML = d.valor
  })
}


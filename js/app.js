class Despesa
{
    constructor(ano, mes, dia, tipo, descricao, valor)
    {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados()
    {

    }
}

class Bd
{
    constructor()
    {
        let id = localStorage.getItem('id')

        if(id === null)
        {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId()
    {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1

    }

    gravar(d)
    {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros()
    {
      //Array de despesas
      let vetorDespesas = Array()
      
      let id = localStorage.getItem('id')

        //recupera todas as despesas no local storage
        for(let i = 1; i <= id; i++)
        {
                //recuperar a despesa
                let despesa = JSON.parse(localStorage.getItem(i))
                
                //Existe a possibilidade de haver indices removidos
                if(despesa === null)
                {
                    continue //recomeça o laço desconsiderando o que vem abaixo
                }

                despesa.id = i
                vetorDespesas.push(despesa)
                //console.log(i, despesa)
        }

        return vetorDespesas
            
      }
    
    pesquisar(despesa)
    {
        let despesasFiltradas = Array()

        despesasFiltradas =  this.recuperarTodosRegistros()
        
        
        //console.log(despesa)
        console.log(despesasFiltradas)

        
        //ano
        if(despesa.ano != '')
        {
          console.log('Filtro de Ano')
          despesasFiltradas = despesasFiltradas.filter(f => f.ano == despesa.ano)
        }

        //mes
        if(despesa.mes != '')
        {
          console.log('Filtro de Mes')
          despesasFiltradas = despesasFiltradas.filter(f => f.mes == despesa.mes)
          console.log(despesasFiltradas)
        }

        
        //dia
        if(despesa.dia != '')
        {
          console.log('Filtro de Dia')
          despesasFiltradas = despesasFiltradas.filter(f => f.dia == despesa.dia)
          console.log(despesasFiltradas)
        }

        //tipo
        if(despesa.tipo != '')
        {
          console.log('Filtro de Tipo')
          despesasFiltradas = despesasFiltradas.filter(f => f.tipo == despesa.tipo)
        }

        //descricao
        if(despesa.descricao != '')
        {
          console.log('Filtro de Descrição')
          despesasFiltradas = despesasFiltradas.filter(f => f.descricao == despesa.descricao)
        }

        //valor
        if(despesa.valor != '')
        {
          console.log('Filtro de Valor')
          despesasFiltradas = despesasFiltradas.filter(f => f.valor == despesa.valor)
        }

        return despesasFiltradas
        
    }

    remover(id)
    {
        localStorage.removeItem(id)
    }
}

let bd = new Bd()


function cadastrarDispesa()
{
    var ano = document.getElementById('ano')
    var mes = document.getElementById('mes')
    var dia = document.getElementById('dia')
    var tipo = document.getElementById('tipo')
    var descricao = document.getElementById('descricao')
    var valor = document.getElementById('valor')
       
    

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)


    if(validarCampos())
    {
        bd.gravar(despesa)

        //Alterando nomes e button do modal
        document.getElementById('modalTitulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modalTitulo').className = 'text-success'
        document.getElementById('modalMensagem').innerHTML = 'A despesa foi cadastrada com sucesso'
        document.getElementById('btnModal').innerText = 'Voltar'
        document.getElementById('btnModal').className = 'btn btn-success'

        $('#modalValidacao').modal('show') 
        
        limparCampos()
    }
    else
    {
        $('#modalValidacao').modal('show')  
        console.log(mes.value)    
    }
    
    //limparCampos()

}

function limparCampos()
{
    document.getElementById('ano').value = ''
    document.getElementById('mes').value = ''
    document.getElementById('dia').value = ''
    document.getElementById('tipo').value = ''
    document.getElementById('descricao').value = ''
    document.getElementById('valor').value = ''
}

function validarCampos()
{
    //Alterando o titulo e o button
    document.getElementById('modalTitulo').innerHTML = 'Erro no Cadastro'
    document.getElementById('btnModal').innerText = 'Voltar e corrigir'
    //Ano
    if(ano.value === '')
    { 
        document.getElementById('ano').className = 'form-control border-danger text-dark'
        document.getElementById('modalMensagem').innerHTML = 'Preencha o campo <strong>Ano</strong>.'     
        return false
    }

    else
    {
        document.getElementById('ano').className = 'form-control border-dark text-dark'
    }

    //Mes
    if(mes.value === '')
    {
        document.getElementById('mes').className = 'form-control border-danger text-dark'
        document.getElementById('modalMensagem').innerHTML = 'Preencha corretamente o <strong>Mês</strong>'  
        return false
    }
    else
    {
        document.getElementById('mes').className = 'form-control border-dark text-dark'       
    }

    //Dia
    if(dia.value == '')
    {
        document.getElementById('dia').className = 'form-control border-danger text-dark'
        document.getElementById('modalMensagem').innerHTML = 'Preencha o campo <strong>Dia</strong> corretamente'  
        return false
    }

    else if((mes.value == 2) && ((dia.value < 1) || (dia.value > 28)))
    {
        document.getElementById('dia').className = 'form-control border-danger text-dark'
        document.getElementById('modalMensagem').innerHTML = 'Preencha o campo <strong>Dia com datas entre 1 e 28</strong>'  
        return false
    }

    else if(((mes.value == 1) || (mes.value == 3) || (mes.value == 5) || (mes.value == 7) || (mes.value == 8) || (mes.value == 10) || (mes.value == 12)) && ((dia.value < 1) ||(dia.value > 31)))
    {
        document.getElementById('dia').className = 'form-control border-danger text-dark'
        document.getElementById('modalMensagem').innerHTML = 'Preencha o campo <strong>Dia com datas entre 1 e 31</strong>'  
        return false
    }

    else if(((mes.value == 4) || (mes.value == 6) || (mes.value == 9) || (mes.value == 11)) && ((dia.value < 1) || (dia.value > 30)))
    {
        document.getElementById('dia').className = 'form-control border-danger text-dark'
        document.getElementById('modalMensagem').innerHTML = 'Preencha o campo <strong>Dia com datas entre 1 e 30</strong>'  
        return false
    }

    else
    {
        document.getElementById('dia').className = 'form-control border-dark text-dark'
    }

    //Tipo
    if(tipo.value === '')
    {
        document.getElementById('tipo').className = 'form-control border-danger text-dark' 
        document.getElementById('modalMensagem').innerHTML = 'Preencha o campo <strong>Tipo</strong> corretamente'  
        return false
    }
    else
    {
        document.getElementById('tipo').className = 'form-control border-dark text-dark'
    }

    //Descrição
    if(descricao.value === "")
    {
        document.getElementById('descricao').className = 'form-control border-danger text-dark'
        document.getElementById('modalMensagem').innerHTML = 'Preencha o campo <strong>Descrição</strong> corretamente'  
        return false
    }
    else{
        document.getElementById('descricao').className = 'form-control border-dark text-dark'
    }

    //Valor
    if(valor.value == '' || valor.value < 0)
    {
        document.getElementById('valor').className = 'form-control border-danger text-dark'   
        document.getElementById('modalMensagem').innerHTML = 'Preencha o campo <strong>Valor</strong> corretamente'  
        return false 
    }

    else{
        document.getElementById('valor').className = 'form-control'
    }

    return true

}

function carregaListaDespesas(despesas = Array(), filtro = false){

    if(despesas.length == 0 && filtro == false)
    {
        despesas = bd.recuperarTodosRegistros()
    }
    
    //Selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    //Percorrer o Array despesas listando de forma dinamica
    despesas.forEach(function (d) 
    {

        //criando linha (tr)
        let linha = listaDespesas.insertRow()

        //criar as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        
        //ajustar o tipo
        switch(d.tipo)
        {
            case '1':
            d.tipo = 'Alimentação'
            break
            
            case '2':
            d.tipo = 'Educação'
            break

            case '3':
            d.tipo = 'Saúde'
            break

            case '4':
            d.tipo = 'Lazer'
            break

            case '5':
            d.tipo = 'Transporte'
            break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = `R$ ${d.valor}`

        //criar o botão de exclusão
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = "<i class = 'fas fa-trash-alt'> </i>"
        btn.id = `id-despesa-${d.id}`
        btn.onclick = function(){
            //remove a despesa


            let id = this.id.replace('id-despesa-', '')
            

            //chama a funcção de remoção
            bd.remover(id)

            //Modal de Conclusão
            document.getElementById('modalExclusaoTitulo').innerHTML = 'Registro removido com sucesso'
            document.getElementById('modalExclusaoTitulo').className = 'text-success'
            document.getElementById('modalExclusaoMensagem').innerHTML = '<strong>A despesa foi removida com sucesso</strong>'
            document.getElementById('btnModalExclusao').innerText = 'Voltar'
            document.getElementById('btnModalExclusao').className = 'btn btn-success'
            
            $('#modalExclusao').modal('show') 

            
            
        }
        linha.insertCell(4).append(btn)

        console.log(d)
    })
    

}

function pesquisarDespesa()
{
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value 
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    let despesas = bd.pesquisar(despesa)

     this.carregaListaDespesas(despesas, true)

}
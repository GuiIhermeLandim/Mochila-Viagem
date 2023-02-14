const form = document.querySelector("#novoItem");
const lista = document.querySelector("#lista");
const itens = JSON.parse(localStorage.getItem("item")) || [];

itens.forEach(element => {

    criaElemento(element)

});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = e.target.elements["nome"];
    const quantidade = e.target.elements["quantidade"];

    const existe = itens.find(element => element.nome === nome.value);

    const itemAtual = {
            "nome": nome.value,
            "quantidade": quantidade.value,
    }

    if(existe){

        itemAtual.id = existe.id;

        if(itemAtual.quantidade == 0){

            itens.splice(itemAtual.id, 1);
            removeElemento(itemAtual);

        } else {

            atualizaElemento(itemAtual);
            itens[existe.id] = itemAtual; 

        }
        


    } else {
        
        itemAtual.id = itens.length;
        criaElemento(itemAtual);
        itens.push(itemAtual);    

    }

    localStorage.setItem("item", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
})

function criaElemento(item) {

    const novoItem = document.createElement("li");
    novoItem.classList.add("item");

    const quantidadeItem = document.createElement("strong");
    quantidadeItem.innerHTML = item.quantidade;
    quantidadeItem.dataset.id = item.id;

    novoItem.appendChild(quantidadeItem);
    novoItem.innerHTML += item.nome;

    lista.appendChild(novoItem);

}

function atualizaElemento(item){

    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;

}

function removeElemento(item) {

    let contador = 0;
    lista.removeChild(document.querySelector("[data-id='" + item.id + "']").parentNode);
    itens.forEach(elemento => {

        elemento.id = contador;
        contador += 1;

    })

    contador = 0;
    const apuraLista = document.getElementsByTagName("strong");

    for (let item of apuraLista) {
        item.dataset.id = contador;
        contador += 1;
    }

}



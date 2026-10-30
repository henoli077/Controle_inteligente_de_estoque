let listaEstoque = JSON.parse(localStorage.getItem("itens_compra")) || [];
let id = JSON.parse(localStorage.getItem("id")) || 1;

window.onload = () => renderizarTabela();

function adicionaDados() {
    const nomeInput = document.getElementById("nome");
    const cateegoriaInput = document.getElementById("categoria");
    const qtdInput = document.getElementById("qtd");
    const qtdMinInput = document.getElementById("qtdMin");
    const valorInput = document.getElementById("valor");

    if (!nomeInput.value || !cateegoriaInput.value || !qtdInput.value || !qtdMinInput.value || !valorInput.value) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    if(qtdInput.value < 0){
        alert("A quantidade de produtos em estoque não pode ser negativo!");
        return;
    }

    if(qtdMinInput.value <= 0){
        alert("O estoque mínimo desejado não pode ser zero ou negativo!");
        return;
    }

    if(valorInput.value <= 0){
        alert("O preço unitário não pode ser zero ou negativo!");
        return;
    }

    const novoItem = {
        ID: id,
        nome: nomeInput.value,
        categoria: cateegoriaInput.value,
        qtd: parseInt(qtdInput.value),
        qtdMin: parseInt(qtdMinInput.value),
        valor: parseFloat(valorInput.value)
    };

    id += 1;

    listaEstoque.push(novoItem);
    salvarNoStorage();
    renderizarTabela();
    botaoCancelar();
}

function salvarNoStorage() {
    localStorage.setItem("itens_compra", JSON.stringify(listaEstoque));
    localStorage.setItem("id", JSON.stringify(id));
}

function botaoCancelar() {
    document.getElementById("nome").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("qtd").value = "";
    document.getElementById("qtdMin").value = "";
    document.getElementById("valor").value = "";
}

function deletaLista() {
    if (confirm("Tem certeza que deseja apagar toda a lista de estoque?")) {
        listaEstoque = [];
        localStorage.removeItem("itens_compra");
        renderizarTabela();
    }
}

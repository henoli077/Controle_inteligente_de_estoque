let listaEstoque = JSON.parse(localStorage.getItem("itens_compra")) || [];
let id = JSON.parse(localStorage.getItem("id")) || 1;

window.onload = () => renderizarTabela();

function adicionaDados() {
    const nomeInput = document.getElementById("nome");
    const cateegoriaInput = document.getElementById("categoria");
    const qtdInput = document.getElementById("qtd");
    const qtdMinInput = document.getElementById("qtdMin");
    const valorInput = document.getElementById("valor");

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

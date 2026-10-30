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

function renderizarTabela() {
    const tbody = document.getElementById("table-body");
    tbody.innerHTML = "";
    let valorTotalGeral = 0;
    let cadastrados = 0;
    let semEstoque = 0;
    let estoqueCritico = 0;

    if (listaEstoque.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8">Nenhum item na lista</td></tr>';
    }

    listaEstoque.forEach((item, index) => {
        const subtotal = item.qtd * item.valor;
        valorTotalGeral += subtotal;

        if(item.qtd > item.qtdMin){
            situacao = "Estoque normal";
        }
        else if(item.qtd <= item.qtdMin && item.qtd > 0){
            situacao = "Estoque crítico"
            estoqueCritico += 1;
        }
        else{
            situacao = "Sem estoque"
            semEstoque += 1;
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${item.ID}</td>
        <td>${item.nome}</td>
        <td>${item.categoria}</td>
        <td>${item.qtd}</td>
        <td>${situacao}</td>
        <td>R$ ${item.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
        <td>R$ ${subtotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
        <td>
        <button onclick="editarItem(${index}) class="btn-edit">
            Editar
        </button>
        <button onclick="removerItem(${index})" class="btn-delete-all">
            X
        </button>
        </td>
        `;
        tbody.appendChild(tr);
    });
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

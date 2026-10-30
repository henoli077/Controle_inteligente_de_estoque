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
        let situacao;

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
        <button onclick="editarItem(${index})" class="btn-edit">
            Editar
        </button>
        <button onclick="removerItem(${index})" class="btn-delete-all">
            X
        </button>
        </td>
        `;
        tbody.appendChild(tr);
    });

    cadastrados = listaEstoque.length;

    document.getElementById("total-produtos-container").innerHTML = 
    `Total de produtos cadastrados: <span>${cadastrados}</span>`;

    document.getElementById("produtos-sem-estoque-container").innerHTML = 
    `Produtos sem estoque: <span>${semEstoque}</span>`;

    document.getElementById("produtos-estoque-critico-container").innerHTML = 
    `Produtos com estoque crítico: <span>${estoqueCritico}</span>`;
    
    document.getElementById("total-container").innerHTML = 
    `Valor total em estoque: <span>R$ ${valorTotalGeral.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>`;
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

function removerItem(index) {
    if (confirm("Tem certeza que deseja apagar o item do estoque?")){
        listaEstoque.splice(index, 1);
        salvarNoStorage();
        renderizarTabela();
    }
}

function editarItem(index) {
    const item = listaEstoque[index];
    const card = document.getElementById("card");
    card.hidden = false;
    card.innerHTML = 
    `<div>
        <h2>EDITAR</h2>
        <div>
            <label>Nome</label>
            <div>
                <input type="text" id="nomeEdicao" value="${item.nome}">
            </div>
        </div>
    </div>
    <div>
        <div>
            <label>Categoria</label>
            <div>
                <input type="text" id="categoriaEdicao" value="${item.categoria}">
            </div>
        </div>
    </div>
    <div>
        <label>Quantidade em estoque</label>
        <div>
            <input type="number" id="qtdEdicao" value="${item.qtd}">
        </div>
    </div>
    <div>
        <label>Estoque mínimo desejado</label>
        <div>
            <input type="number" id="qtdMinEdicao" value="${item.qtdMin}">
        </div>
    </div>
    <div>
        <label>Preço unitário</label>
        <div>
            <input type="number" id="valorEdicao" value="${item.valor}">
        </div>
    </div>
    <div>
        <button onclick="salvarEdicao(${index})" class="btn-add">Salvar</button>
        <button onclick="cancelarEdicao()" class="btn-delete-all">Cancelar</button>
    </div>
    `;
    document.getElementById("nomeEdicao").focus();
}

function salvarEdicao(index) {
    const nomeInput = document.getElementById("nomeEdicao").value;
    const cateegoriaInput = document.getElementById("categoriaEdicao").value;
    const qtdValor = document.getElementById("qtdEdicao").value;
    const qtdMinValor = document.getElementById("qtdMinEdicao").value;
    const valorValor = document.getElementById("valorEdicao").value;

    if (nomeInput === "" || cateegoriaInput === "" || qtdValor === "" || qtdMinValor === "" || valorValor === "") {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    const qtdInput = Number(qtdValor);
    const qtdMinInput = Number(qtdMinValor);
    const valorInput = Number(valorValor);
    
    if(qtdInput < 0){
        alert("A quantidade de produtos em estoque não pode ser negativo!");
        return;
    }

    if(qtdMinInput <= 0){
        alert("O estoque mínimo desejado não pode ser zero ou negativo!");
        return;
    }

    if(valorInput <= 0){
        alert("O preço unitário não pode ser zero ou negativo!");
        return;
    }

    const itemEditado = {
        ID: listaEstoque[index].ID,
        nome: nomeInput,
        categoria: cateegoriaInput,
        qtd: qtdInput,
        qtdMin: qtdMinInput,
        valor: valorInput
    };

    listaEstoque[index] = itemEditado;

    document.getElementById("card").hidden = true;
    
    salvarNoStorage();
    renderizarTabela();
}

function cancelarEdicao(){
    document.getElementById("card").hidden = true;
}

function deletaLista() {
    if (confirm("Tem certeza que deseja apagar toda a lista de estoque?")) {
        listaEstoque = [];
        localStorage.removeItem("itens_compra");
        renderizarTabela();
    }
}

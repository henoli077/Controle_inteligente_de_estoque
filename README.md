# Gerenciamento Inteligente de Estoque

## Descrição
```text
Projeto desenvolvido com HTML, CSS e JavaScript para realizar o gerenciamento inteligente de estoque, permitindo cadastrar, editar e excluir produtos, controlar quantidades disponíveis e acompanhar os níveis de estoque. O sistema também calcula o valor total dos produtos armazenados e identifica itens com estoque crítico ou sem estoque, facilitando o controle e a organização dos produtos.
```

## Funcionalidades
```diff
+ Cadastrar produtos com nome, categoria, quantidade, estoque mínimo e preço unitário
+ Listar produtos cadastrados em uma tabela
+ Editar informações dos produtos
+ Excluir produtos individualmente
+ Excluir todos os produtos cadastrados
+ Validar os campos obrigatórios e os valores informados
+ Identificar produtos com estoque normal
+ Identificar produtos com estoque crítico
+ Identificar produtos sem estoque
+ Calcular o valor total de cada produto em estoque
+ Calcular o valor total de todos os produtos armazenados
+ Exibir a quantidade total de produtos cadastrados
+ Exibir a quantidade de produtos com estoque crítico ou sem estoque
+ Armazenar os dados no LocalStorage do navegador
```

## Tecnologias
```text
- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3
- LocalStorage
```

## Estrutura de arquivos
```lua
Controle_inteligente_de_estoque/
|--- index.html
|--- style/
|    |--- style.css
|--- script/
|    |--- script.js
|--- README.md
```

## Como executar
```text
1. Baixe ou clone o repositório do projeto.
2. Abra a pasta do projeto no Visual Studio Code.
3. Verifique se os arquivos e as pastas estão organizados conforme a estrutura apresentada.
4. Abra o arquivo index.html em um navegador ou utilize a extensão Live Server no Visual Studio Code.
5. Comece a cadastrar e gerenciar os produtos do estoque.
```

## Armazenamento de dados
```text
O sistema utiliza o LocalStorage do navegador para armazenar os produtos cadastrados e o identificador dos registros. Dessa forma, os dados permanecem disponíveis após atualizar ou fechar a página, desde que os dados do navegador não sejam apagados.
```

## Regras de negócio
```text
- O nome e a categoria dos produtos são obrigatórios.
- A quantidade em estoque não pode ser negativa.
- O estoque mínimo desejado deve ser maior que zero.
- O preço unitário deve ser maior que zero.
- Um produto é considerado com estoque normal quando sua quantidade é superior ao estoque mínimo.
- Um produto é considerado com estoque crítico quando sua quantidade é maior que zero e menor ou igual ao estoque mínimo.
- Um produto é considerado sem estoque quando sua quantidade é igual a zero.
- O valor total de cada produto é calculado multiplicando a quantidade em estoque pelo preço unitário.
```

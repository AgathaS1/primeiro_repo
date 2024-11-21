// Função para abrir o modal
function abrirModal() {
    const modal = document.getElementById('modal-tarefa');
    modal.style.display = 'flex'; // Mostra o modal
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById('modal-tarefa');
    modal.style.display = 'none'; // Esconde o modal
}

// Função para adicionar uma nova tarefa
function adicionarTarefa(titulo, descricao) {
    // Cria um novo elemento de tarefa
    const novaTarefa = document.createElement('div');
    novaTarefa.classList.add('tarefa');

    // Define o conteúdo da tarefa com os valores do usuário
    novaTarefa.innerHTML = `
        <h3 class="titulo-tarefa">${titulo}</h3>
        <p class="descricao-tarefa">${descricao}</p>
    `;

    // Adiciona a nova tarefa ao contêiner de tarefas acumuladas
    document.getElementById('tarefas-acumuladas').appendChild(novaTarefa);
}

// Função para salvar a tarefa e fechar o modal
document.getElementById('salvar-tarefa').addEventListener('click', function() {
    // Captura o nome e a descrição da nova tarefa
    const nomeTarefa = document.getElementById('nome').value;
    const descricaoTarefa = document.getElementById('descricao').value;

    // Verifica se os campos estão preenchidos
    if (nomeTarefa === '' || descricaoTarefa === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Adiciona a tarefa à lista
    adicionarTarefa(nomeTarefa, descricaoTarefa);

    // Limpa os campos de input
    document.getElementById('nome').value = '';
    document.getElementById('descricao').value = '';

    // Fecha o modal
    fecharModal();
});

// Para abrir o modal quando os botões "Adicionar Tarefa" forem clicados
document.getElementById('adicionar').addEventListener('click', abrirModal);
document.getElementById('botao-tarefa').addEventListener('click', abrirModal);

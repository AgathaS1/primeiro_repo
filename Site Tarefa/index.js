function abrirModal() { 
    const modal = document.getElementById('modal-tarefa');
    modal.style.display = 'flex'; // Mostra o modal
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById('modal-tarefa');
    modal.style.display = 'none'; // Esconde o modal
}

// Cria um array para armazenar todas as tarefas
let listaDeTarefas = [];

// Evento para exibir o campo de nova etiqueta, se selecionada
document.getElementById('etiqueta').addEventListener('change', function() {
    const etiquetaSelecionada = this.value;
    const novaEtiquetaContainer = document.getElementById('nova-etiqueta-container');
    
    if (etiquetaSelecionada === 'novo') {
        novaEtiquetaContainer.style.display = 'block';
    } else {
        novaEtiquetaContainer.style.display = 'none';
    }
});

// Função para adicionar uma nova etiqueta ao dropdown
document.getElementById('adicionar-etiqueta').addEventListener('click', function() {
    const novaEtiqueta = document.getElementById('nova-etiqueta').value;
    
    if (novaEtiqueta) {
        // Adiciona a nova etiqueta ao select
        const option = document.createElement('option');
        option.value = novaEtiqueta;
        option.text = novaEtiqueta;
        document.getElementById('etiqueta').add(option);

        // Seleciona a nova etiqueta que foi adicionada
        document.getElementById('etiqueta').value = novaEtiqueta;

        // Esconde o campo de nova etiqueta e limpa o input
        document.getElementById('nova-etiqueta-container').style.display = 'none';
        document.getElementById('nova-etiqueta').value = '';
    }
});

// Função para adicionar uma nova tarefa ao array
function adicionarTarefa(titulo, descricao, data, prioridade, etiqueta) {
    const dataObj = new Date(data);
    const dataCorreta = new Date(dataObj.getTime() + dataObj.getTimezoneOffset() * 60000).toLocaleDateString();

    const emojiPrioridade = {
        baixa: '🟢',
        media: '🟡',
        alta: '🔴'
    };
    // Cria um objeto tarefa
    const tarefa = {
        titulo: titulo,
        descricao: descricao,
        data: data ? dataCorreta : 'Sem data',
        prioridade,
        prioridadeEmoji: emojiPrioridade[prioridade],
        etiqueta: etiqueta 
    };

    // Adiciona a tarefa ao array e ordena as tarefas
    listaDeTarefas.push(tarefa);
    listaDeTarefas.sort((a, b) => {
        const prioridadeValores = { alta: 1, media: 2, baixa: 3 };
        return prioridadeValores[a.prioridade] - prioridadeValores[b.prioridade];
    });

    renderizarTarefas();
}

// Função para filtrar tarefas
function filtrarTarefas() {

    const nomeFiltro = document.getElementById('filtro-nome').value.toLowerCase();
    const prioridadeFiltro = document.getElementById('filtro-prioridade').value;
    const dataFiltro = document.getElementById('filtro-data').value;

    const tarefasFiltradas = listaDeTarefas.filter(tarefa => {
        const nomeCondicao = tarefa.titulo.toLowerCase().includes(nomeFiltro);
        const prioridadeCondicao = prioridadeFiltro ? tarefa.prioridade === prioridadeFiltro : true;

        // Condição de data: se o filtro de data estiver preenchido, compare com a data da tarefa
        let dataCondicao = true;
        if (dataFiltro) {
            const dataTarefa = new Date(tarefa.data.split('/').reverse().join('-')).toISOString().split('T')[0];
            dataCondicao = dataTarefa === dataFiltro;
        }

        return nomeCondicao && prioridadeCondicao && dataCondicao;
    });

    renderizarTarefas(tarefasFiltradas);
}



function renderizarTarefas(tarefasParaRenderizar = listaDeTarefas) {
    const listaTarefas = document.getElementById('tarefas-acumuladas');
    listaTarefas.innerHTML = ''; // Limpa o conteúdo atual

    tarefasParaRenderizar.forEach(tarefa => {
        const novaTarefa = document.createElement('div');
        novaTarefa.classList.add('tarefa', `prioridade-${tarefa.prioridade}`);

        novaTarefa.innerHTML = `
            <h3 class="titulo-tarefa">${tarefa.titulo}</h3>
            <p class="descricao-tarefa">${tarefa.descricao}</p>
            <p class="data-tarefa">${tarefa.data}</p>
            <p class="etiqueta-tarefa">${tarefa.etiqueta}</p>
            <p class="prioridade-tarefa"> ${tarefa.prioridadeEmoji}</p>   
            <button class="concluir-tarefa">Concluído</button>
        `;

        novaTarefa.querySelector('.concluir-tarefa').addEventListener('click', function() {
            const index = listaDeTarefas.indexOf(tarefa);
            if (index > -1) listaDeTarefas.splice(index, 1);
            renderizarTarefas(listaDeTarefas);
        });

        listaTarefas.appendChild(novaTarefa);
    });
}

// Evento para aplicar o filtro quando o botão é clicado
document.getElementById('aplicar-filtro').addEventListener('click', filtrarTarefas);

document.getElementById('buscar-botao').addEventListener('click', function() {
    const filtroContainer = document.getElementById('filtro-container');
    
    // Alterna entre 'none' e 'flex'
    if (filtroContainer.style.display === 'none' || filtroContainer.style.display === '') {
        filtroContainer.style.display = 'flex';
    } else {
        filtroContainer.style.display = 'none';
    }
});

// Função para salvar a tarefa e fechar o modal
document.getElementById('salvar-tarefa').addEventListener('click', function() {
    const nomeTarefa = document.getElementById('nome').value;
    const descricaoTarefa = document.getElementById('descricao').value;
    const dataTarefa = document.getElementById('data-tarefa').value;
    const prioridadeTarefa = document.getElementById('prioridade').value; 
    const etiquetaTarefa = document.getElementById('etiqueta').value;

    if (nomeTarefa === '' || descricaoTarefa === '' || etiquetaTarefa === 'novo' || etiquetaTarefa == 'undefined' || prioridadeTarefa == 'undefined') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    adicionarTarefa(nomeTarefa, descricaoTarefa, dataTarefa, prioridadeTarefa, etiquetaTarefa);

    // Limpa os campos de input
    document.getElementById('nome').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('data-tarefa').value = ''; 
    document.getElementById('prioridade').value = 'baixa'; 
    document.getElementById('etiqueta').value = '';

    fecharModal();
});

// Para abrir o modal quando os botões "Adicionar Tarefa" forem clicados
document.getElementById('adicionar').addEventListener('click', abrirModal);
document.getElementById('botao-tarefa').addEventListener('click', abrirModal);

// Evento para aplicar o filtro quando o botão é clicado
document.getElementById('aplicar-filtro').addEventListener('click', filtrarTarefas);



let contador = 0; // Inicializa o contador

function trocarTemaLogin(){
    if (contador === 0) {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = '#252525';
    

    // Altera a cor de fundo da caixa
    var caixa = document.querySelector(".caixa");
    if (caixa) {
        caixa.style.backgroundColor = "black";
    }

    // Altera a cor do botão
    document.getElementById("logar").style.backgroundColor = '#181e33';

} else {
        // Adiciona a imagem de fundo
        document.body.style.backgroundImage = "url('img/Pixel_Art_Fundo.jpg')"; // Corrige o caminho da imagem

        // Altera a cor de fundo da caixa
        var caixa = document.querySelector(".caixa");
        if (caixa) {
            caixa.style.backgroundColor = "transparent";
        }

        // Altera a cor do botão
        document.getElementById("logar").style.backgroundColor = '#6F8BFF';
    }

    // Alterna o valor do contador
    contador = (contador === 0) ? 1 : 0; // Alterna entre 0 e 1
}


function trocarTemaCadastro() {
    // Remove o background da página
    if (contador === 0) {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = '#252525';

        // Altera a cor de fundo da caixa
        var caixa = document.querySelector(".caixa");
        if (caixa) {
            caixa.style.backgroundColor = "black";
        }

        // Altera a cor do botão
        document.getElementById("cadastrar").style.backgroundColor = '#181e33';
    } else {
        // Adiciona a imagem de fundo
        document.body.style.backgroundImage = "url('img/Pixel_Art_Fundo.jpg')"; // Corrige o caminho da imagem

        // Altera a cor de fundo da caixa
        var caixa = document.querySelector(".caixa");
        if (caixa) {
            caixa.style.backgroundColor = "transparent";
        }

        // Altera a cor do botão
        document.getElementById("cadastrar").style.backgroundColor = '#6F8BFF';
    }

    // Alterna o valor do contador
    contador = (contador === 0) ? 1 : 0; // Alterna entre 0 e 1
}
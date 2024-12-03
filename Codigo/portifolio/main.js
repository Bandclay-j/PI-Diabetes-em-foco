function ativarModo() {
    let body = document.body;
    let botao = document.getElementById('botao');
    let img = botao.querySelector('img');

    //Alterna a classe do modo escuro no body
    body.classList.toggle('dark-mode');

    // Altera o ícone entre lua e sol
    if (body.classList.contains('dark-mode')) {
        img.src = './img/sun.png'; // Ícone de sol para modo escuro
        img.alt = 'Icone do Sol';
    } else {
        img.src = './img/half-moon.png';
        img.alt = 'Icone da Lua';
    }
}
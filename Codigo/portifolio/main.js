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

// Função para navegação automática dos carrosséis
function autoPlayCarousels() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach((carousel) => {
        const radioButtons = carousel.querySelectorAll('input[type="radio"]');
        let currentIndex = 0;

        setInterval(() => {
            radioButtons[currentIndex].checked = false;
            currentIndex = (currentIndex + 1) % radioButtons.length;
            radioButtons[currentIndex].checked = true;
        }, 5000); // Muda o slide a cada 5 segundos
    });
}

// Função para abrir o modal com a imagem e descrição
function openModal(imageSrc, caption) {
    // Cria o modal dinamicamente
    const modal = document.createElement('div');
    modal.className = 'modal';

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <img src="${imageSrc}" alt="${caption}">
            <p>${caption}</p>
        </div>
    `;

    document.body.appendChild(modal);

    // Exibe o modal
    modal.style.display = 'block';

    // Fechar o modal
    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.remove();
    });

    // Fechar ao clicar fora do conteúdo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.remove();
        }
    });
}

// Executa a função de autoplay ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    autoPlayCarousels();
});

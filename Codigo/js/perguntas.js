document.addEventListener("DOMContentLoaded", function() {
    // Carrossel de Imagens
    const images = document.querySelectorAll(".carousel-images img");
    const prevButton = document.querySelector(".carousel-button.prev");
    const nextButton = document.querySelector(".carousel-button.next");
    let currentIndex = 0;
    let autoRotateInterval; // Armazena o intervalo de rotação automática
    const rotateDelay = 3000; // Tempo de rotação automática em milissegundos (3 segundos)

    // Função para mostrar uma imagem específica
    function showImage(index) {
        images.forEach(img => img.classList.remove("active"));
        images[index].classList.add("active");
    }

    // Função para mostrar a imagem anterior
    function prevImage() {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        showImage(currentIndex);
    }

    // Função para mostrar a próxima imagem
    function nextImage() {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        showImage(currentIndex);
    }

    // Inicia a rotação automática
    function startAutoRotate() {
        stopAutoRotate(); // Evita múltiplos intervalos
        autoRotateInterval = setInterval(nextImage, rotateDelay);
    }

    // Para a rotação automática
    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }

    // Adicionar ouvintes de evento
    prevButton.addEventListener("click", () => {
        prevImage();
        startAutoRotate(); // Reinicia a rotação automática após interação
    });

    nextButton.addEventListener("click", () => {
        nextImage();
        startAutoRotate(); // Reinicia a rotação automática após interação
    });

    // Pausa e retoma a rotação ao interagir com as imagens
    images.forEach(img => {
        img.addEventListener("mouseenter", stopAutoRotate); // Pausa ao passar o mouse
        img.addEventListener("mouseleave", startAutoRotate); // Retoma ao sair do mouse
    });

    // Inicializar a primeira imagem
    showImage(currentIndex);

    // Iniciar rotação automática ao carregar
    startAutoRotate();

    // Perguntas Frequentes
    const faqTitles = document.querySelectorAll(".faq-title");
    faqTitles.forEach(function(title) {
        title.addEventListener("click", function() {
            const faqItem = this.nextElementSibling;
            const parentLi = this.parentElement;

            document.querySelectorAll(".faq-questions li").forEach(function(li) {
                if (li !== parentLi && li.classList.contains("active")) {
                    li.classList.remove("active");
                    li.querySelector(".faq-item").style.maxHeight = null;
                }
            });

            if (parentLi.classList.contains("active")) {
                parentLi.classList.remove("active");
                faqItem.style.maxHeight = null;
            } else {
                parentLi.classList.add("active");
                faqItem.style.maxHeight = faqItem.scrollHeight + "px";
            }
        });
    });
});

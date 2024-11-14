document.addEventListener("DOMContentLoaded", function() {
    // Carrossel de Imagens
    const images = document.querySelectorAll(".carousel-images img");
    const prevButton = document.querySelector(".carousel-button.prev");
    const nextButton = document.querySelector(".carousel-button.next");
    let currentIndex = 0;

    function showImage(index) {
        images.forEach(img => img.classList.remove("active"));
        images[index].classList.add("active");
    }

    function prevImage() {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        showImage(currentIndex);
    }

    function nextImage() {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        showImage(currentIndex);
    }

    prevButton.addEventListener("click", prevImage);
    nextButton.addEventListener("click", nextImage);

    // Inicializar primeira imagem
    showImage(currentIndex);

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

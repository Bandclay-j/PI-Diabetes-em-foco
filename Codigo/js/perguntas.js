document.addEventListener("DOMContentLoaded", function() {
    const faqTitles = document.querySelectorAll(".faq-title");

    faqTitles.forEach(function(title) {
        title.addEventListener("click", function() {
            const faqItem = this.nextElementSibling;

            //Verifica se a resposta está visível
            if (faqItem.style.display === "block") {
                faqItem.style.display = "none"; // esconde
            } else {
                // Esconde todas as outras respostas
                document.querySelectorAll(".faq-item").forEach(function(item) {
                    item.style.display = "none";
                });

                // Exibe a resposta clicada
                faqItem.style.display = "block";
            }

        });

    });

});
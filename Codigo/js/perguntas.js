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

    // Inicializar o chatbot
    const chatbotToggle = document.querySelector(".chatbot-toggle");
    const chatbot = document.querySelector(".chatbot");
    const chatbotClose = document.querySelector(".chatbot-close");
    const chatbotMessages = document.querySelector(".chatbot-messages");
    const chatbotInput = document.querySelector("#chatbot-input");
    const chatbotSend = document.querySelector("#chatbot-send");

    // Exibir ou ocultar o chatbot
    chatbotToggle.addEventListener("click", () => {
        chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
    });

    chatbotClose.addEventListener("click", () => {
        chatbot.style.display = "none";
    });

    // Enviar mensagem
    chatbotSend.addEventListener("click", sendMessage);
    chatbotInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
        const userInput = chatbotInput.value.trim();
        if (!userInput) return;

        // Exibir a mensagem do usuário
        addMessage("user", userInput);

        // Enviar para o backend (IA)
        fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userInput })
        })
        .then(response => response.json())
        .then(data => {
            const botReply = data.reply || "Desculpe, não entendi sua pergunta.";
            addMessage("bot", botReply);
        })
        .catch(err => {
            console.error("Erro ao comunicar com o servidor", err);
            addMessage("bot", "Houve um erro. Tente novamente.");
        });

        chatbotInput.value = "";
    }

    function addMessage(sender, text) {
        const message = document.createElement("div");
        message.classList.add("message", `${sender}-message`);

        const bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.textContent = text;

        message.appendChild(bubble);
        chatbotMessages.appendChild(message);

        // Rolar para a mensagem mais recente
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

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

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
    document.getElementById('send-button').addEventListener('click', sendMessage);
    document.getElementById('user-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    async function sendMessage() {
        const userInput = document.getElementById('user-input').value;
        if (userInput.trim() === '') return;
    
        // Exibe a mensagem do usuário na tela
        displayMessage(userInput, 'user');
    
        // Limpa o campo de entrada
        document.getElementById('user-input').value = '';
    
        // Envia a mensagem para o back-end
        const response = await getBotResponse(userInput);
        
        // Exibe a resposta do chatbot
        displayMessage(response, 'bot');
    }
    
    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.innerText = message;
        
        document.getElementById('chat-box').appendChild(messageDiv);
        document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
    }
    
    async function getBotResponse(userMessage) {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });
    
        const data = await response.json();
        return data.reply;
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

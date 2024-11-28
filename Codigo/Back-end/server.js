const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3000;

// Middleware para processar JSON e servir arquivos estáticos
app.use(express.json());
app.use(express.static("public"));

// API Key e endpoint do Google Gemini
const googleApiKey = process.env.GOOGLE_API_KEY;
const googleEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${googleApiKey}`;

// Rota de chat
app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(googleEndpoint, {
            contents: [
                {
                    parts: [
                        {
                            text: userMessage
                        }
                    ]
                }
            ]
        });

        // Log da resposta completa para verificar a estrutura
        console.log("Resposta da API:", response.data);

        // Verificar se a resposta contém o campo 'candidates' e acessar o conteúdo
        if (response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
            const botReply = response.data.candidates[0].content; // Acessa o conteúdo gerado
            res.json({ reply: botReply });
        } else {
            console.error("Resposta inesperada da API.");
            res.status(500).json({ reply: "Erro ao processar a resposta da IA." });
        }
    } catch (error) {
        console.error("Erro ao comunicar com a IA:", error);
        res.status(500).json({ reply: "Erro na comunicação com a IA." });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

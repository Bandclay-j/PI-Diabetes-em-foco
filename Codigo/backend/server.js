require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuração da API do OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Chamada para a OpenAI
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: userMessage}],
        });

        const botReply = response.choices[0].message.content;
        res.json({ reply: botReply });
    } catch (error) {
        console.error('Erro ao obter resposta do OpenAI: ', error);
        res.status(500).send('Erro ao processar sua solicitação.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodadeando na porta ${port}`);
});
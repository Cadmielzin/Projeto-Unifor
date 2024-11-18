// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Obter as variáveis de ambiente para a porta e o URI do MongoDB
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

console.log(`Servidor rodando na porta: ${port}`);
console.log(`Conectando ao banco: ${mongoUri}`);

const app = express();
app.use(bodyParser.json());

// Conectar ao banco de dados com a variável de ambiente MONGO_URI
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas simples de exemplo
app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

// Iniciar o servidor na porta configurada
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

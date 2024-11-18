require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

const app = express();
app.use(bodyParser.json());

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

const User = require('./models/user');

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Criar um novo usuário
  const newUser = new User({
    username,
    email,
    password,
  });

  newUser.save()
    .then(() => res.status(201).send('Usuário registrado com sucesso!'))
    .catch(err => res.status(400).send('Erro ao registrar usuário: ' + err));
});

// Rota para obter a lista de usuários
app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Buscar todos os usuários
    res.status(200).json(users); // Retornar a lista no formato JSON
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Rota para atualizar informações de um usuário
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true } // Retorna o usuário atualizado
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Rota para remover um usuário
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Usuário removido com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover usuário' });
  }
});

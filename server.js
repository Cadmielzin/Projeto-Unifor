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

  const newUser = new User({
    username,
    email,
    password,
  });

  newUser.save()
    .then(() => res.status(201).send('Usuário registrado com sucesso!'))
    .catch(err => res.status(400).send('Erro ao registrar usuário: ' + err));
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); 
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

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

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('Usuário não encontrado!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Senha incorreta!');
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login bem-sucedido!', token });
  } catch (err) {
    res.status(500).send('Erro ao realizar login: ' + err);
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Acesso negado!');

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified; 
    next();
  } catch (err) {
    res.status(403).send('Token inválido!');
  }
};

app.get('/admin', authenticateToken, (req, res) => {
  res.send(`Bem-vindo(a), ${req.user.username}! Você está autenticado.`);
});

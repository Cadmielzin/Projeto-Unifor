require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

const app = express();
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Model do usuário
const User = require('./models/user');

// Rota de registro
app.post('/register', async (req, res) => {
  const { name, username, password } = req.body; // Mudança de 'email' para 'username'

  // Verificar se o usuário já existe
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).send('Usuário já registrado!');
  }

  // Criptografar senha antes de salvar no banco
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    username,  // Alterado para 'username'
    password: hashedPassword,
  });

  newUser.save()
    .then(() => res.status(201).send('Usuário registrado com sucesso!'))
    .catch(err => res.status(400).send('Erro ao registrar usuário: ' + err));
});

// Rota de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;  // Mudança de 'email' para 'username'

  try {
    const user = await User.findOne({ username });  // Mudança para 'username'
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

// Middleware para autenticar o token JWT
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

// Rota protegida de admin
app.get('/admin', authenticateToken, (req, res) => {
  res.send(`Bem-vindo(a), ${req.user.username}! Você está autenticado.`);
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

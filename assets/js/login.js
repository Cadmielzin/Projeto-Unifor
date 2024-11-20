async function loginUser(event) {
  event.preventDefault(); // Para não recarregar a página

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.post('http://localhost:3000/login', {
      email,
      password,
    });

    const token = response.data.token;
    localStorage.setItem('authToken', token); // Armazenar o token no localStorage

    alert('Login bem-sucedido!');
    window.location.href = 'admin.html'; // Redirecionar para a página de admin
  } catch (error) {
    console.error('Erro no login:', error);
    alert('Erro ao fazer login. Verifique suas credenciais.');
  }
}

document.getElementById('loginForm').addEventListener('submit', loginUser);

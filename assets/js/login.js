async function entrar(event) {
  event.preventDefault(); // Para não recarregar a página

  const usuario = document.getElementById('usuario').value.trim();
  const senha = document.getElementById('senha').value.trim();
  const msgError = document.getElementById('msgError');
  const msgSuccess = document.getElementById('msgSuccess');

  // Validação
  if (!usuario || !senha) {
    msgError.textContent = "Preencha todos os campos.";
    msgError.style.display = "block";
    msgSuccess.style.display = "none";
    return;
  }

  try {
    // Alterando o campo "email" para "username"
    const response = await axios.post('http://localhost:3000/login', {
      username: usuario, // Enviar como "username"
      password: senha,
    });

    // Exibindo feedback de sucesso
    msgSuccess.textContent = "Login bem-sucedido!";
    msgSuccess.style.display = "block";
    msgError.style.display = "none";

    const token = response.data.token;
    localStorage.setItem('authToken', token); // Armazenar o token no localStorage

    setTimeout(() => {
      window.location.href = 'admin.html'; // Redirecionar para a página de admin
    }, 1000); // Aguarda 1 segundo antes de redirecionar

  } catch (error) {
    console.error('Erro no login:', error);
    msgError.textContent = 'Erro ao fazer login. Verifique suas credenciais.';
    msgError.style.display = 'block';
    msgSuccess.style.display = 'none';
  }
}

document.getElementById('loginForm').addEventListener('submit', entrar);

// Funcionalidade para mostrar/ocultar a senha
document.querySelector('.fa-eye').addEventListener('click', () => {
  const passwordInput = document.getElementById('senha');
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
});

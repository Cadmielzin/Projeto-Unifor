async function cadastrar(event) {
  event.preventDefault(); // Evita o reload da página

  const nome = document.getElementById("nome").value.trim();
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmSenha = document.getElementById("confirmSenha").value.trim();
  const msgError = document.getElementById("msgError");
  const msgSuccess = document.getElementById("msgSuccess");

  // Validações
  if (!nome || !usuario || !senha || !confirmSenha) {
    msgError.textContent = "Preencha todos os campos.";
    msgError.style.display = "block";
    return;
  }

  if (senha !== confirmSenha) {
    msgError.textContent = "As senhas não coincidem.";
    msgError.style.display = "block";
    return;
  }

  // Envia os dados para o backend
  try {
    await axios.post('http://localhost:3000/register', {
      name: nome,       // Envia como 'name' (correspondente ao backend)
      username: usuario, // Envia como 'username'
      password: senha,    // Envia como 'password'
    });

    // Mostra sucesso ao usuário
    msgSuccess.textContent = "Cadastro realizado com sucesso!";
    msgSuccess.style.display = "block";
    msgError.style.display = "none";
  } catch (error) {
    // Lida com erros do backend
    msgError.textContent = error.response?.data || "Erro ao cadastrar. Tente novamente.";
    msgError.style.display = "block";
    msgSuccess.style.display = "none";
  }
}

// Funcionalidade para exibir/ocultar senha
document.getElementById('verSenha').addEventListener('click', () => {
  const senhaInput = document.getElementById('senha');
  senhaInput.type = senhaInput.type === 'password' ? 'text' : 'password';
});

document.getElementById('verConfirmSenha').addEventListener('click', () => {
  const confirmSenhaInput = document.getElementById('confirmSenha');
  confirmSenhaInput.type = confirmSenhaInput.type === 'password' ? 'text' : 'password';
});

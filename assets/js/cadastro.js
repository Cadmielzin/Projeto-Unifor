async function cadastrar(event) {
  event.preventDefault(); // Para não recarregar a página

  const nome = document.getElementById("nome").value.trim();
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmSenha = document.getElementById("confirmSenha").value.trim();
  const msgError = document.getElementById("msgError");
  const msgSuccess = document.getElementById("msgSuccess");

  if (!nome || !usuario || !senha || !confirmSenha) {
    msgError.textContent = "Preencha todos os campos.";
    msgError.style.display = "block";
    msgSuccess.style.display = "none";
    return;
  }

  if (senha !== confirmSenha) {
    msgError.textContent = "As senhas não correspondem.";
    msgError.style.display = "block";
    msgSuccess.style.display = "none";
    return;
  }

  // Enviar dados do formulário para o backend
  try {
    const response = await axios.post('http://localhost:3000/register', {
      username: usuario,
      email: usuario + "@gmail.com", // ou pegar o e-mail do formulário
      password: senha,
    });

    // Se o cadastro for bem-sucedido
    msgSuccess.textContent = "Cadastro realizado com sucesso!";
    msgSuccess.style.display = "block";
    msgError.style.display = "none";

    // Limpar campos do formulário após o sucesso
    document.getElementById("nome").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("confirmSenha").value = "";
  } catch (error) {
    msgError.textContent = "Erro ao realizar o cadastro. Tente novamente.";
    msgError.style.display = "block";
    msgSuccess.style.display = "none";
  }
}

document.getElementById("cadastroForm").addEventListener("submit", cadastrar);

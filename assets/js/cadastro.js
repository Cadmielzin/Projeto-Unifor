function cadastrar() {
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

    msgSuccess.textContent = "Cadastro realizado com sucesso!";
    msgSuccess.style.display = "block";
    msgError.style.display = "none";
  
    document.getElementById("nome").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("confirmSenha").value = "";
  }
  
  document.getElementById("verSenha").addEventListener("click", function () {
    const senhaInput = document.getElementById("senha");
    senhaInput.type = senhaInput.type === "password" ? "text" : "password";
  });
  
  document.getElementById("verConfirmSenha").addEventListener("click", function () {
    const confirmSenhaInput = document.getElementById("confirmSenha");
    confirmSenhaInput.type = confirmSenhaInput.type === "password" ? "text" : "password";
  });  
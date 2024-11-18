function entrar() {
    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const msgError = document.getElementById("msgError");
  
    if (usuario === "" || senha === "") {
      msgError.textContent = "Preencha todos os campos.";
      msgError.style.display = "block";
      return;
    }
  
    if (usuario === "admin" && senha === "1234") {
      alert("Login realizado com sucesso!");
      window.location.href = "../../index.html";
    } else {
      msgError.textContent = "Usuário ou senha inválidos.";
      msgError.style.display = "block";
    }
  }
  
  document.querySelector(".fa-eye").addEventListener("click", function () {
    const senhaInput = document.getElementById("senha");
    senhaInput.type = senhaInput.type === "password" ? "text" : "password";
  });
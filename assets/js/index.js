document.addEventListener("DOMContentLoaded", () => {
    const btns = document.querySelectorAll(".btn");
    
    btns.forEach(btn => {
      btn.addEventListener("click", (event) => {
        console.log(`Botão ${event.target.textContent} clicado.`);
      });
    });
  });
  
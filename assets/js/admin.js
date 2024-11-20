window.onload = async function() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      window.location.href = 'login.html'; // Redirecionar para login se não houver token
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:3000/admin', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      const userList = document.getElementById('userList');
      userList.innerHTML = `<li>Bem-vindo, ${response.data.username}!</li>`;
    } catch (error) {
      console.error('Erro ao acessar área administrativa:', error);
      window.location.href = 'login.html'; // Redirecionar se o token for inválido
    }
  };
  
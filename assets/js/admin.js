const API_URL = "http://localhost:3000";

// Função para carregar usuários
async function fetchUsers() {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    alert('Você precisa fazer login primeiro!');
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const users = response.data;
    const userList = document.getElementById('userList');

    // Renderizar usuários na tela
    users.forEach(user => {
      const listItem = document.createElement('li');
      listItem.textContent = `${user.username} (${user.email})`;
      userList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
    alert('Erro ao acessar os dados.');
  }
}

// Chamar a função ao carregar a página
window.onload = fetchUsers;

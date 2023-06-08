// Obtém o formulário e o botão de envio
const loginForm = document.querySelector('form');
const loginButton = document.querySelector('button');
let errorMessage = null;

// Adiciona um evento de envio ao formulário de login
loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o envio do formulário

  // Remove a mensagem de erro anterior, se existir
  removeErrorMessage();

  // Obtém os valores do email e senha informados pelo usuário
  const email = document.querySelector('#email').value;
  const senha = document.querySelector('#senha').value;

  // Verifica se algum dos campos está em branco
  if (email === '' || senha === '') {
    // Exibe uma mensagem de erro caso algum campo esteja em branco
    errorMessage = createErrorMessage('Por favor, preencha todos os campos.');
    const errorContainer = document.querySelector('.error-container');
    errorContainer.appendChild(errorMessage);
    return; // Encerra a função para impedir o envio do formulário
  }

  // Verifica se há dados de usuários salvos no Local Storage
  if (localStorage.getItem('users')) {
    // Obtém os usuários salvos do Local Storage
    const users = JSON.parse(localStorage.getItem('users'));

    // Procura pelo usuário com o email e senha correspondentes
    const authenticatedUser = users.find(function(user) {
      return user.email === email && user.password === senha;
    });

    if (authenticatedUser) {
      // Redireciona o usuário para a página "index.html"
      localStorage.setItem('username', authenticatedUser.name);
      window.location.href = '../index.html';
    } else {
      // Caso as credenciais estejam incorretas, exibe uma mensagem de erro
      showUserNotFoundError();
    }
  } else {
    // Se não houver usuários salvos, exibe uma mensagem informando que não há dados
    alert('Nenhum dado de usuário encontrado.');
  }
});

// Função para criar uma mensagem de erro
function createErrorMessage(text) {
  const errorMessage = document.createElement('span');
  errorMessage.innerText = text;
  errorMessage.classList.add('error-message');
  return errorMessage;
}

// Função para remover a mensagem de erro anterior, se existir
function removeErrorMessage() {
  const errorContainer = document.querySelector('.error-container');
  errorContainer.innerHTML = ''; // Remove todos os elementos filhos
}

// Função para exibir mensagem de erro quando o usuário não for encontrado
function showUserNotFoundError() {
  errorMessage = createErrorMessage('Usuário não encontrado ou dados incorretos.');
  const errorContainer = document.querySelector('.error-container');
  errorContainer.appendChild(errorMessage);
}

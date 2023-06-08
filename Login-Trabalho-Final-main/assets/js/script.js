// Obtém o formulário e o botão de envio
const form = document.querySelector('.form');
const submitButton = document.querySelector('button');

// Adiciona um evento de envio ao formulário
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o envio do formulário

  // Obtém os valores dos campos do formulário
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#senha2').value;
  const dateOfBirth = document.querySelector('#datebirth').value;

  // Verifica se algum dos campos está vazio
  if (name === '' || email === '' || password === '') {
    // Exibe uma mensagem de erro caso algum campo esteja vazio
    alert('Por favor, preencha todos os campos obrigatórios.');
    return; // Encerra a função para impedir o envio do formulário
  }

  // Verifica se as senhas correspondem
  if (password !== confirmPassword) {
    // Exibe uma mensagem de erro caso as senhas não correspondam
    if (!document.querySelector('.error')) {
      const errorElement = document.createElement('p');
      errorElement.textContent = 'As senhas não correspondem';
      errorElement.classList.add('error');
      form.appendChild(errorElement);
    }
    document.querySelector('#senha2').classList.add('error-border');
    return; // Encerra a função para impedir o envio do formulário
  } else {
    // Remove a mensagem de erro e a borda vermelha, se existirem
    const errorElement = document.querySelector('.error');
    if (errorElement) {
      errorElement.remove();
    }
    document.querySelector('#senha2').classList.remove('active');
  }

  // Cria um objeto com os dados do usuário
  const user = {
    name: name,
    email: email,
    password: password,
    dateOfBirth: dateOfBirth
  };

  // Verifica se o Local Storage está disponível no navegador
  if (typeof(Storage) !== 'undefined') {
    // Verifica se já existe algum dado salvo no Local Storage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se já existe um usuário com o mesmo nome ou e-mail
    const existingUser = users.find(function(existingUser) {
      return existingUser.name === name || existingUser.email === email;
    });

    if (existingUser) {
      // Exibe uma mensagem de erro informando que o usuário já existe
      alert('Já existe um usuário com o mesmo nome ou e-mail.');
      return; // Encerra a função para impedir o envio do formulário
    }

    // Adiciona o novo usuário à lista
    users.push(user);

    // Salva a lista atualizada no Local Storage
    localStorage.setItem('users', JSON.stringify(users));

    // Limpa os campos do formulário
    form.reset();

    // Exibe uma mensagem de sucesso
    alert('Cadastro realizado com sucesso!');

    // Redireciona para a página index.html
    localStorage.setItem('username', authenticatedUser.name);
      window.location.href = 'pagina-de-login.html';
  } else {
    // Se o Local Storage não estiver disponível, exibe uma mensagem de erro
    alert('Desculpe, seu navegador não suporta o Local Storage.');
  }
});

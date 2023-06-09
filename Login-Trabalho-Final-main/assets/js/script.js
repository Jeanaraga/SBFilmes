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
if (name === '' || email === '' || password === '' || dateOfBirth === '') {
  // Exibe uma mensagem de erro caso algum campo esteja vazio
  alert('Por favor, preencha todos os campos obrigatórios.');
  return; // Encerra a função para impedir o envio do formulário
}

// Verifica o formato da data de nascimento
const dateOfBirthRegex = /^\d{4}-\d{2}-\d{2}$/;
if (!dateOfBirthRegex.test(dateOfBirth)) {
  // Exibe uma mensagem de erro caso o formato da data de nascimento seja inválido
  alert('Por favor, digite uma data de nascimento válida no formato AAAA-MM-DD.');
  return; // Encerra a função para impedir o envio do formulário
}

// Verifica se a data de nascimento é maior que 2022 ou menor que 1900
const birthYear = parseInt(dateOfBirth.substring(0, 4), 10);
if (birthYear > 2022 || birthYear < 1900) {
  // Exibe uma mensagem de erro caso a data de nascimento seja inválida
  alert('Por favor, digite uma data de nascimento válida entre 1900 e 2022.');
  return; // Encerra a função para impedir o envio do formulário
}

  // Verifica se algum dos campos está vazio
  if (name === '' || email === '' || password === '') {
    // Exibe uma mensagem de erro caso algum campo esteja vazio
    alert('Por favor, preencha todos os campos obrigatórios.');
    return; // Encerra a função para impedir o envio do formulário
  }

  // Verifica se o e-mail possui o domínio ".com"
if (!email.endsWith('.com')) {
  // Exibe uma mensagem de erro caso o e-mail não tenha o domínio ".com"
  const errorMessage = 'Digite um e-mail válido com o domínio ".com".';
  // const errorContainer = document.querySelector('.error-container');
 alert(errorMessage)
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
    // localStorage.setItem('username', authenticatedUser.name);
    window.location.href = './pagina-de-login.html';
  } else {
    // Se o Local Storage não estiver disponível, exibe uma mensagem de erro
    alert('Desculpe, seu navegador não suporta o Local Storage.');
  }
});

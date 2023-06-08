// Adiciona eventos de mouseover e mouseout às imagens
const imagens = document.querySelectorAll('.filmesBloquinho a img');
imagens.forEach(imagem => {
  imagem.addEventListener('mouseover', function() {
    const span = this.parentNode.parentNode.querySelector('.attTrailer');
    span.textContent = 'assistir trailer';
  });

  imagem.addEventListener('mouseout', function() {
    const span = this.parentNode.parentNode.querySelector('.attTrailer');
    span.textContent = '';
  });
});

// Verifica se o nome do usuário está armazenado no Local Storage
if (localStorage.getItem('username')) {
  // Obtém o nome do usuário do Local Storage
  const username = localStorage.getItem('username');

  // Substitui o conteúdo do elemento "usernameContainer" pelo nome do usuário
  document.getElementById('usernameContainer').textContent = `Bem-vindo, ${username}!`;
  document.querySelector('.user-icon a').style.display = 'none';
}

function autoReloadPage(timeInSeconds) {
  setTimeout(function() {
    location.reload();
  }, timeInSeconds * 1000);
}


function exitUser() {
  autoReloadPage(1);
  alert('O usuário foi deslogado!')
  // Remover o nome do usuário do Local Storage
  localStorage.removeItem('username');

  // Remover o objeto do usuário do Local Storage
  var usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
  delete usuarios[username];
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Limpar o conteúdo do elemento com id "usernameContainer"
  document.getElementById('usernameContainer').textContent = '';

  // Reexibir o ícone de usuário
  document.querySelector('.user-icon a').style.display = 'inline';
}



  // Função para verificar o login antes de redirecionar o usuário
  function checkLogin(event) {
    // Impede o redirecionamento padrão do link

    // Verifica se o nome do usuário está armazenado no Local Storage
    if (localStorage.getItem('username')) {
      // Obtém o nome do usuário do Local Storage
      const username = localStorage.getItem('username');

      // Exibe um alerta informando que o usuário está logado
      alert(`Você está logado como ${username}!`);

      // Redireciona o usuário para o link
      window.location.href = event.target.href;
    } else {
      // Exibe um alerta informando que o usuário precisa fazer login
      event.preventDefault();
      alert('Por favor, faça login para acessar este conteúdo.');
      // Ou você pode redirecionar o usuário para a página de login usando:
      // window.location.href = './Login-Trabalho-Final-main/pagina-de-login.html';
    }
  }

  // Adiciona eventos de clique aos links que contêm imagens
  const links = document.querySelectorAll('.filmesBloquinho a');
  links.forEach(link => {
    link.addEventListener('click', checkLogin);
  });


  function verificarFilmesFavoritos() {
    var filmesBloquinhos = document.querySelectorAll('.filmesBloquinho');
  
    filmesBloquinhos.forEach(filmeBloquinho => {
      var tituloFilme = filmeBloquinho.querySelector("h3").innerText;
      var imagemFilme = filmeBloquinho.querySelector("img").src;
  
      if (localStorage.getItem('username')) {
        const username = localStorage.getItem('username');
  
        var usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
        var favoritos = usuarios[username]?.favoritos || [];
  
        var filmeJaCurtido = favoritos.some(function(filme) {
          return filme.titulo === tituloFilme && filme.imagem === imagemFilme;
        });
  
        var button = filmeBloquinho.querySelector('.favorite-span');
  
        if (filmeJaCurtido) {
          button.innerHTML = "Curtido <i class='fas fa-star'></i>";
          button.disabled = true;
        } else {
          button.innerHTML = "Curtir <i class='far fa-star'></i>";
          button.disabled = false;
        }
      }
    });
  }
  

  document.addEventListener('DOMContentLoaded', function() {
    verificarFilmesFavoritos();
  });
  
  

  function toggleFavorite(button) {
    var filmesBloquinho = button.parentNode;
    var tituloFilme = filmesBloquinho.querySelector("h3").innerText;
    var imagemFilme = filmesBloquinho.querySelector("img").src;
  
    if (localStorage.getItem('username')) {
      const username = localStorage.getItem('username');
  
      var usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
      var favoritos = usuarios[username]?.favoritos || [];
  
      var filmeJaCurtido = favoritos.some(function(filme) {
        return filme.titulo === tituloFilme && filme.imagem === imagemFilme;
      });
  
      if (filmeJaCurtido) {
        favoritos = favoritos.filter(function(filme) {
          return filme.titulo !== tituloFilme || filme.imagem !== imagemFilme;
        });
  
        usuarios[username] = { ...usuarios[username], favoritos };
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
  
        button.innerHTML = "Curtir <i class='far fa-star'></i>";
        button.disabled = false;
  
        console.log("Filme descurtido");
        console.log("Filmes favoritos do usuário:", favoritos);
      } else {
        if (favoritos.length < 12) {
          favoritos.push({ titulo: tituloFilme, imagem: imagemFilme });
  
          usuarios[username] = { ...usuarios[username], favoritos };
          localStorage.setItem("usuarios", JSON.stringify(usuarios));
  
          button.innerHTML = "Curtido <i class='fas fa-star'></i>";
          button.disabled = true;
  
          console.log("Filme curtido");
          console.log("Filmes favoritos do usuário:", favoritos);
        } else {
          alert('Limite de filmes favoritos atingido (limite: 12).');
        }
      }
    } else {
      alert('Por favor, faça login para curtir filmes.');
    }
  }

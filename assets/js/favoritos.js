
function preencherFilmesFavoritos() {
    if (localStorage.getItem('username')) {
      const username = localStorage.getItem('username');
  
      var usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
      var favoritos = usuarios[username]?.favoritos || [];
  
      var filmesBloquinhos = document.querySelectorAll('.filmesBloquinho');
  
      favoritos.forEach(function(filme, index) {
        var blocoFilme = filmesBloquinhos[index];
  
        var imgElement = blocoFilme.querySelector('img');
        var h3Element = blocoFilme.querySelector('h3');
        var aElement = blocoFilme.querySelector('a');
  
        imgElement.src = filme.imagem;
        h3Element.innerText = filme.titulo;
        aElement.href = filme.link;
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    preencherFilmesFavoritos();
  });
  
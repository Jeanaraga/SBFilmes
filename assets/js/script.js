// Função responsável por alternar a barra lateral (sidebar) entre aberta e fechada
function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}

// Função para fechar a barra lateral quando ocorre um clique fora dela
function closeSidebarOnClickOutside(event) {
  var sidebar = document.getElementById('sidebar');
  var sidebarContent = document.querySelector('.sidebar-content');
  var openSidebarButton = document.querySelector('.open-sidebar-button');

  // Verifica se o clique ocorreu fora da barra lateral, do seu conteúdo e do botão que a abre
  if (
    !sidebar.contains(event.target) &&
    !sidebarContent.contains(event.target) &&
    !openSidebarButton.contains(event.target)
  ) {
    sidebar.classList.remove('open');
  }
}

// Adiciona um ouvinte de evento de clique na página para fechar a barra lateral quando ocorre um clique fora dela
document.addEventListener('click', closeSidebarOnClickOutside);

// IIFE (Immediately Invoked Function Expression) para criar o carrossel de imagens
(function() {
  var carouselList = document.querySelector('.carousel-list');
  var carouselItems = document.querySelectorAll('.carousel-list li');
  var carouselItemWidth = carouselItems[0].offsetWidth;
  var currentIndex = 0;
  var intervalId; // Variável para armazenar o ID do intervalo

  // Função para mover para o próximo item do carrossel
  function moveToNextItem() {
    if (currentIndex < carouselItems.length - 1) {
      currentIndex++;
      carouselList.style.transform = 'translateX(-' + (currentIndex * carouselItemWidth) + 'px)';
    } else {
      currentIndex = 0; // Volta ao primeiro item quando chegar ao último
      carouselList.style.transform = 'translateX(0)';
    }
  }

  // Função para iniciar o carrossel, movendo-se automaticamente a cada 2 segundos
  function startCarousel() {
    intervalId = setInterval(moveToNextItem, 2000); // Executa a função a cada 2 segundos (2000 milissegundos)
  }

  // Função para pausar o carrossel quando o mouse estiver sobre ele
  function stopCarousel() {
    clearInterval(intervalId); // Limpa o intervalo
  }

  // Função para avançar para o próximo item quando o carrossel for clicado
  function handleClickOnCarousel() {
    moveToNextItem();
  }

  // Inicia o carrossel automaticamente
  startCarousel();

  // Pausa o carrossel quando o mouse estiver sobre ele
  carouselList.addEventListener('mouseenter', stopCarousel);

  // Reinicia o carrossel quando o mouse sair dele
  carouselList.addEventListener('mouseleave', startCarousel);

  // Avança para o próximo item quando o carrossel for clicado
  carouselList.addEventListener('click', handleClickOnCarousel);
})();

// Função para lidar com o evento de carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
  var menuItems = document.querySelectorAll('.menu-item');

  // Adiciona um ouvinte de evento de clique a cada item do menu
  menuItems.forEach(function(item) {
    item.addEventListener('click', function() {
      // Remove a classe 'selected' de todos os itens do menu
      menuItems.forEach(function(item) {
        item.classList.remove('selected');
      });

      // Adiciona a classe 'selected' ao item do menu que foi clicado
      this.classList.add('selected');
    });
  });
});

// Função para alternar a marcação de um filme como favorito
function toggleFavorite(button) {
  const movieElement = button.parentNode;
  const movieTitle = movieElement.querySelector('h3').textContent;
  const isFavorite = movieElement.classList.toggle('favorite');

  // Atualiza o ícone e adiciona ou remove o filme dos favoritos
  if (isFavorite) {
    button.innerHTML = ' <i class="fas fa-star"></i>';
    addToFavorites(movieTitle);
  } else {
    button.innerHTML = 'Curtir <i class="far fa-star"></i>';
    removeFromFavorites(movieTitle);
  }
}

// Função para adicionar um filme aos favoritos
function addToFavorites(movieTitle) {
  let favorites = localStorage.getItem('favorites');
  favorites = favorites ? JSON.parse(favorites) : [];

  // Adiciona o título do filme aos favoritos, se ainda não estiver presente
  if (!favorites.includes(movieTitle)) {
    favorites.push(movieTitle);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

// Função para remover um filme dos favoritos
function removeFromFavorites(movieTitle) {
  let favorites = localStorage.getItem('favorites');
  favorites = favorites ? JSON.parse(favorites) : [];

  // Remove o título do filme dos favoritos, se estiver presente
  const index = favorites.indexOf(movieTitle);
  if (index > -1) {
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

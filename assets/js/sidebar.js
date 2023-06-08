// Função para alternar a barra lateral (sidebar) entre aberta e fechada
function toggleSidebar() {
  var sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

// Função para fechar a barra lateral quando ocorre um clique fora dela
function closeSidebarOnClickOutside(event) {
  var sidebar = document.getElementById("sidebar");
  var sidebarContent = document.querySelector(".sidebar-content");
  var openSidebarButton = document.querySelector(".open-sidebar-button");

  if (
    !sidebar.contains(event.target) &&
    !sidebarContent.contains(event.target) &&
    !openSidebarButton.contains(event.target)
  ) {
    sidebar.classList.remove("open");
  }
}

// Adiciona um ouvinte de evento de clique na página para fechar a barra lateral quando ocorre um clique fora dela
document.addEventListener("click", closeSidebarOnClickOutside);

// Função para lidar com o evento de carregamento do DOM
document.addEventListener("DOMContentLoaded", function () {
  var menuItems = document.querySelectorAll(".menu-item");

  // Adiciona um ouvinte de evento de clique a cada item do menu
  menuItems.forEach(function (item) {
    item.addEventListener("click", function () {
      // Remove a classe 'selected' de todos os itens do menu
      menuItems.forEach(function (item) {
        item.classList.remove("selected");
      });

      // Adiciona a classe 'selected' ao item do menu que foi clicado
      this.classList.add("selected");
    });
  });
});

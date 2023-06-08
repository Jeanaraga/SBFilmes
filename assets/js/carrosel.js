// Carrossel de imagens
(function() {
  var carouselList = document.querySelector('.carousel-list');
  var carouselItems = document.querySelectorAll('.carousel-list li');
  var carouselItemWidth = carouselItems[0].offsetWidth;
  var currentIndex = 0;
  var intervalId;

  // Move para o próximo item do carrossel
  function moveToNextItem() {
    if (currentIndex < carouselItems.length - 1) {
      currentIndex++;
      carouselList.style.transform = 'translateX(-' + (currentIndex * carouselItemWidth) + 'px)';
    } else {
      currentIndex = 0;
      carouselList.style.transform = 'translateX(0)';
    }
  }

  // Inicia o carrossel automaticamente
  function startCarousel() {
    intervalId = setInterval(moveToNextItem, 2000);
  }

  // Pausa o carrossel quando o mouse estiver sobre ele
  function stopCarousel() {
    clearInterval(intervalId);
  }

  // Avança para o próximo item quando o carrossel for clicado
  function handleClickOnCarousel() {
    moveToNextItem();
  }

  startCarousel();
  carouselList.addEventListener('mouseenter', stopCarousel);
  carouselList.addEventListener('mouseleave', startCarousel);
  carouselList.addEventListener('click', handleClickOnCarousel);
})();

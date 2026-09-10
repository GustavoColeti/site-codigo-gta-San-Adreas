document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const cards = document.querySelectorAll('.card');
  const filterButtons = document.querySelectorAll('.filter-buttons .btn');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');

  // 1. FUNCIONALIDADE DE PESQUISA EM TEMPO REAL
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();

    cards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();

      if (title.includes(query) || description.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // 2. FILTRAGEM POR CATEGORIA (Dicas, Teorias, Vídeos, Todos)
  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Remove a classe "active" dos outros botões e adiciona no clicado
      filterButtons.forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');

      const category = e.target.getAttribute('data-filter');

      // Restaura o campo de pesquisa ao trocar de categoria
      searchInput.value = '';

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. EXPANDIR IMAGEM NO MODAL AO CLICAR
  const cardImages = document.querySelectorAll('.card img');

  cardImages.forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.style.display = 'flex';
    });
  });

  // 4. FECHAR MODAL
  window.closeModal = function() {
    modal.style.display = 'none';
  };

  // Fechar o modal clicando fora da imagem ou com a tecla ESC
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-close')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
});
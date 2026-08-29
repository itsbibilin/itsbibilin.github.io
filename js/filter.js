const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');

function applyFilter(category, activeFilter) {
  filters.forEach(item => item.classList.toggle('active', item === activeFilter));
  cards.forEach(card => {
    card.hidden = card.dataset.category !== category;
  });
}

filters.forEach(filter => {
  filter.addEventListener('click', event => {
    event.preventDefault();

    applyFilter(filter.dataset.filter, filter);
  });
});

const activeFilter = document.querySelector('.filter.active');
applyFilter(activeFilter.dataset.filter, activeFilter);

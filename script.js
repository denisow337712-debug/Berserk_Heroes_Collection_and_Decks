let allCards = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('cards.json')
        .then(response => response.json())
        .then(data => {
            allCards = data;
            console.log(`Загружено карт: ${allCards.length}`);
            populateFilters();
            displayCards(allCards);
            setupListeners();
        })
        .catch(error => console.error('Ошибка загрузки базы карт:', error));
});

function populateFilters() {
    const setFilter = document.getElementById('set-filter');
    if (!setFilter) return;

    const sets = [...new Set(allCards.map(card => card.set))];
    
    sets.forEach(setName => {
        const option = document.createElement('option');
        option.value = setName;
        option.textContent = setName;
        setFilter.appendChild(option);
    });
}

function setupListeners() {
    const setFilter = document.getElementById('set-filter');
    const searchInput = document.getElementById('search-input');

    const filterHandler = () => {
        const selectedSet = setFilter.value;
        const searchQuery = searchInput.value.toLowerCase().trim();

        const filtered = allCards.filter(card => {
            const matchesSet = !selectedSet || card.set === selectedSet;
            const matchesSearch = card.name.toLowerCase().includes(searchQuery);
            return matchesSet && matchesSearch;
        });

        displayCards(filtered);
    };

    setFilter.addEventListener('change', filterHandler);
    searchInput.addEventListener('input', filterHandler);
}

function displayCards(cardsToRender) {
    const container = document.getElementById('cards-container');
    if (!container) return;
    
    container.innerHTML = '';

    if (cardsToRender.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Карты не найдены</p>';
        return;
    }

    // Выводим первые 100 подходящих карт (для быстрой работы интерфейса)
    const sliceCards = cardsToRender.slice(0, 100);

    sliceCards.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card-item';
        cardEl.innerHTML = `
            <h3>${card.name}</h3>
            <p><strong>Сет:</strong> ${card.set}</p>
            <p><strong>Стихия:</strong> ${card.element || 'Нейтральная'}</p>
            <p><strong>Стоимость:</strong> ${card.cost} зол.</p>
            <p><strong>Редкость:</strong> ${card.rarity}</p>
        `;
        container.appendChild(cardEl);
    });
}

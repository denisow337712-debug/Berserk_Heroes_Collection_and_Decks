// Небольшая тестовая база карт «Берсерк. Герои»
const cardsDatabase = [
    { id: 1, name: "Свирепый гарпунщик", element: "Степь", type: "Существо", cost: 3, text: "Нападка. При атаке наносит 1 дополнительный урон." },
    { id: 2, name: "Лесной стрелок", element: "Лес", type: "Существо", cost: 2, text: "Выстрел на 2." },
    { id: 3, name: "Горный страж", element: "Горы", type: "Существо", cost: 4, text: "Броня 1. Страж." },
    { id: 4, name: "Теневой ассасин", element: "Тьма", type: "Существо", cost: 3, text: "Удар из тени." },
    { id: 5, name: "Болотный змей", element: "Болото", type: "Существо", cost: 5,text: "Отражение яда." },
    { id: 6, name: "Золотая монета", element: "Нейтральная", type: "Экипировка", cost: 0, text: "Дает +1 золото при розыгрыше." }
];

const cardsGrid = document.getElementById('cardsGrid');
const searchInput = document.getElementById('searchInput');
const elementFilter = document.getElementById('elementFilter');

// Функция отрисовки карточек на экране
function renderCards(cardsToRender) {
    cardsGrid.innerHTML = '';
    
    if (cardsToRender.length === 0) {
        cardsGrid.innerHTML = '<p>Карты не найдены...</p>';
        return;
    }

    cardsToRender.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <h3>${card.name}</h3>
            <p><strong>Стихия:</strong> ${card.element}</p>
            <p><strong>Тип:</strong> ${card.type} (Монет: ${card.cost})</p>
            <p>${card.text}</p>
        `;
        cardsGrid.appendChild(cardElement);
    });
}

// Функция фильтрации и поиска
function filterCards() {
    const searchText = searchInput.value.toLowerCase();
    const selectedElement = elementFilter.value;

    const filtered = cardsDatabase.filter(card => {
        const matchesSearch = card.name.toLowerCase().includes(searchText);
        const matchesElement = (selectedElement === 'all' || card.element === selectedElement);
        return matchesSearch && matchesElement;
    });

    renderCards(filtered);
}

// Слушатели событий для ввода текста и выбора стихии
searchInput.addEventListener('input', filterCards);
elementFilter.addEventListener('change', filterCards);

// Первичная отрисовка при загрузке страницы
renderCards(cardsDatabase);

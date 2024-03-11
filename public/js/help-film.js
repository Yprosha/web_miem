document.addEventListener('DOMContentLoaded', function() {
    const randomButton = document.querySelector('.form-help');
    const filmCard = document.querySelector('.result');

    filmCard.style.display = 'none';

    function showFilmCard() {
        filmCard.style.display = 'grid';
    }

    randomButton.addEventListener('click', showFilmCard);
});

const form = document.querySelector('form');
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const message = document.getElementById('message').value;

    try {
        const response = await axios.post('/api/movies/help', { message });
        console.log(response.data);
    } catch (error) {
        console.error('Ошибка отправки данных:', error);
    }
});
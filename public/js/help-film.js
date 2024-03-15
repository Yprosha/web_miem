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

        const photoPath = response.data.photoPath;
        const filmName = response.data.filmName;
        const filmRate = (Math.random() * (3) + 7).toFixed(2);
        const filmLink = response.data.filmLink;

        updateFilmInfo(photoPath, filmName, filmRate, filmLink);
    } catch (error) {
        console.error('Ошибка отправки данных:', error);
    }
});

function updateFilmInfo(photoPath, filmName, filmRate, filmLink) {
    const filmImg = document.querySelector('.film-img');
    const filmNameElement = document.querySelector('.film-name');
    const filmRateElement = document.querySelector('.film-rate-num');
    const filmLinkElement = document.querySelector('.film-link');

    filmImg.src = photoPath;
    filmNameElement.textContent = filmName;
    filmRateElement.textContent = filmRate;
    filmLinkElement.href = filmLink;
}



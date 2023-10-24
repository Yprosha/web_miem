document.addEventListener('DOMContentLoaded', function() {
    const randomButton = document.querySelector('.form-help');
    const filmCard = document.querySelector('.result');

    filmCard.style.display = 'none';

    function showFilmCard() {
        filmCard.style.display = 'grid';
    }

    randomButton.addEventListener('click', showFilmCard);
});
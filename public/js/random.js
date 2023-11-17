const updateFilmData = async () => {
    try {
        const response = await axios.get('/api/random');
        const { imageUrl, filmTitle, filmLink } = response.data;

        document.getElementById('filmPoster').src = imageUrl;
        document.getElementById('filmName').textContent = `Фильм: ${filmTitle}`;
        document.getElementById('filmButton').parentNode.href = filmLink;
    } catch (error) {
        console.error('Ошибка получения данных:', error);
    }
};

document.getElementById('randomButton').addEventListener('click', updateFilmData);
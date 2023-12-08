const form = document.getElementById('thankYouForm');
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    try {
        const response = await axios.post('/api/thankyou', { name, message });
        console.log(response.data);
        alert('Благодарность отправлена!');
    } catch (error) {
        console.error('Ошибка отправки данных:', error);
        alert('Произошла ошибка при отправке благодарности.');
    }
});
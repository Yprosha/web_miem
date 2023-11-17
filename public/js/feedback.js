const form = document.getElementById('feedbackForm');
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const response = await axios.post('/api/feedback', { email, message });
        console.log(response.data);
        alert('Сообщение успешно отправлено!');
    } catch (error) {
        console.error('Ошибка отправки данных:', error);
        alert('Произошла ошибка при отправке сообщения.');
    }
});
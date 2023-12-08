const modalContainerBlock = document.querySelector('.modal-container-block');

const addButton = document.querySelector('.btn-add-film');

addButton.addEventListener('click', async () => {
    try {
        const response = await axios.get('/top-k/film/add');

        modalContainerBlock.innerHTML = '';
        modalContainerBlock.innerHTML = response.data;

        const form = document.querySelector('.add-film-container');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const placeValue = document.getElementById('place').value;
            const nameValue = document.getElementById('name').value;
            const photoLinkValue = document.getElementById('photo_link').value;
            const rateValue = document.getElementById('rate').value;
            const filmLinkValue = document.getElementById('film_link').value;
            const descriptionValue = document.getElementById('description').value;

            try {
                const response = await axios.post('/api/top-k/film', {
                    place: placeValue,
                    name: nameValue,
                    photo_link: photoLinkValue,
                    rate: rateValue,
                    film_link: filmLinkValue,
                    description: descriptionValue
                });
                console.log('Ответ от сервера:', response.data);
                window.location.href = "/top-k";
            } catch (error) {
                console.error('Ошибка при отправке данных:', error);
            }
        });

        const close = document.querySelector('.btn-close');
        closeBtn(close);
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }
});

function closeBtn(close) {
    close.addEventListener('click', () => {
        modalContainerBlock.innerHTML = '';
    });
}


const pageInput = document.getElementById('pageInput');
const goToPageBtn = document.querySelector('.pagination-container button');
const filmsContainer = document.querySelector('.top-list');

const curPageNumber = parseInt(pageInput.value);
loadFilm(curPageNumber);


async function loadFilm(pageNumber) {
    try {
        const response = await axios.get(`/api/top-k/film`, {params: {page: pageNumber}});
        updateFilmsContainer(response.data);
    } catch (error) {
        console.error('Ошибка при загрузке:', error);
    }
}

goToPageBtn.addEventListener('click', async () => {
    const pageNumber = parseInt(pageInput.value);
    if (!isNaN(pageNumber) && pageNumber > 0) {
        await loadFilm(pageNumber);
    } else {
        console.error('Некорректный номер страницы');
    }
});

function updateFilmsContainer(newHTML) {
    filmsContainer.innerHTML = '';
    filmsContainer.innerHTML = newHTML;
    updateBtn()
}


async function updateBtn() {
    const infoBtns = document.querySelectorAll('.info-btn');

    infoBtns.forEach(infoBtn => {
        infoBtn.addEventListener('click', async () => {
            try {
                const film_id = infoBtn.getAttribute('data-id');
                const response = await axios.get('/api/top-k/one-film', {params: {film_id: film_id}});

                modalContainerBlock.innerHTML = '';
                modalContainerBlock.innerHTML = response.data;

                const btnSaveChanges = document.querySelector('.btn-change');
                const btnDeleteMovie = document.querySelector('.btn-delete');


                btnSaveChanges.addEventListener('click', async (e) => {
                    e.preventDefault();

                    const placeValue = document.getElementById('place').value;
                    const nameValue = document.getElementById('name').value;
                    const photoLinkValue = document.getElementById('photo_link').value;
                    const rateValue = document.getElementById('rate').value;
                    const filmLinkValue = document.getElementById('film_link').value;
                    const descriptionValue = document.getElementById('description').value;

                    await axios.put('/api/top-k/film', {
                        id: film_id,
                        place: placeValue,
                        name: nameValue,
                        photo_link: photoLinkValue,
                        rate: rateValue,
                        film_link: filmLinkValue,
                        description: descriptionValue
                    }).then(response => {
                        console.log('Изменения успешно сохранены:', response.data);
                        window.location.href = "/top-k";
                    }).catch(error => {
                        console.error('Ошибка при сохранении изменений:', error);
                    });
                });

                btnDeleteMovie.addEventListener('click', async () => {

                    await axios.delete(`/api/top-k/film/${film_id}`)
                        .then(response => {
                            console.log('Фильм успешно удален:', response.data);
                            window.location.href = "/top-k";

                        })
                        .catch(error => {
                            console.error('Ошибка при удалении фильма:', error);
                        });
                });

                const close = document.querySelector('.btn-close');
                closeBtn(close);
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        })
    })
}
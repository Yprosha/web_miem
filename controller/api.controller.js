const path = require('path');
const ejs = require('ejs');
const { exec } = require('child_process');

const topkModel = require('../model/topk.model');
const topiModel = require('../model/topi.model');


class ApiController{

    async getVisitor(req, res) {
        const visitorData = [
            { month: 'Январь', value: 120 },
            { month: 'Февраль', value: 280 },
            { month: 'Март', value: 380 },
            { month: 'Апрель', value: 210 },
            { month: 'Май', value: 420 },
            { month: 'Июнь', value: 252 },
            { month: 'Июль', value: 199 },
            { month: 'Август', value: 220 },
            { month: 'Сентябрь', value: 133 },
            { month: 'Октябрь', value: 333 },
            { month: 'Ноябрь', value: 121 },
            { month: 'Декабрь', value: 280 }
        ];

        const labels = visitorData.map(item => item.month);
        const values = visitorData.map(item => item.value);

        const chartData = {
            labels: labels,
            values: values,
        };

        res.json(chartData);
    }

    async getMovieRandom(req, res) {
        const moviesRandomizedData = [
            { date: '2023-11-09', count: 15 },
            { date: '2023-11-10', count: 20 },
            { date: '2023-11-11', count: 45 },
            { date: '2023-11-12', count: 22 },
            { date: '2023-11-13', count: 4 },
            { date: '2023-11-14', count: 33 },
            { date: '2023-11-15', count: 19 },
        ];

        res.json(moviesRandomizedData);
    }

    async getMovieTop(req, res) {
        const topMoviesData = {
            imdbTop250: 385,
            kinopoiskTop250: 588,
        };

        res.json(topMoviesData);
    }

    async getMovieHelp(req, res) {
        const helpData = [
            { date: '2023-11-09', count: 230 },
            { date: '2023-11-10', count: 145 },
            { date: '2023-11-11', count: 355 },
            { date: '2023-11-12', count: 40 },
            { date: '2023-11-13', count: 256 },
            { date: '2023-11-14', count: 160 },
            { date: '2023-11-15', count: 115 },
        ];

        res.json(helpData);
    }

    async getPeopleConfusion(req, res) {
        const confusionData = [
            { date: '2023-11-09', count: 120 },
            { date: '2023-11-10', count: 99 },
            { date: '2023-11-11', count: 204 },
            { date: '2023-11-12', count: 128 },
            { date: '2023-11-13', count: 145 },
            { date: '2023-11-14', count: 212 },
            { date: '2023-11-15', count: 79 },
        ];

        res.json(confusionData);
    }

    async postMovieHelp(req, res) {
        const message = req.body.message;
        console.log('Полученное сообщение из формы:', message);

        const pythonScriptPath = path.join(__dirname, '..', 'parsing_kinopoisk', 'gpt_movie_helper.py');

        const command = `python ${pythonScriptPath} '${message}'`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Ошибка выполнения скрипта Python:', error);
                res.status(500).json({ error: 'Ошибка выполнения скрипта Python' });
                return;
            }

            if (stderr) {
                console.error('Ошибка выполнения скрипта Python:', stderr);
                res.status(500).json({ error: 'Ошибка выполнения скрипта Python' });
                return;
            }

            try {
                console.log(stdout);
                const movieData = JSON.parse(stdout.trim());

                const updatedFilmData = {
                    photoPath: movieData.poster,
                    filmName: movieData.name,
                    filmLink: movieData.url
                };

                res.json(updatedFilmData);
            } catch (parseError) {
                console.error('Ошибка парсинга JSON:', parseError);
                res.status(500).json({ error: 'Ошибка парсинга JSON' });
            }
        });
    }

    async postFeedback(req, res) {
        const { email, message } = req.body;
        console.log('Email:', email);
        console.log('Сообщение:', message);
        res.status(200).send('Сообщение получено.');
    }

    async postThankYou(req, res) {
        const { name, message } = req.body;
        console.log('Имя:', name);
        console.log('Сообщение благодарности:', message);
        res.status(200).send('Благодарность получена.');
    }

    async getFilmRandom(req, res) {
        const pythonScriptPath = path.join(__dirname, '..', 'parsing_kinopoisk', 'random_movie.py');

        const command = `python ${pythonScriptPath}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Ошибка выполнения скрипта Python:', error);
                res.status(500).json({ error: 'Ошибка выполнения скрипта Python' });
                return;
            }

            if (stderr) {
                console.error('Ошибка выполнения скрипта Python:', stderr);
                res.status(500).json({ error: 'Ошибка выполнения скрипта Python' });
                return;
            }

            try {
                console.log(stdout + '111');
                const movieData = JSON.parse(stdout.trim());

                const updatedFilmData = {
                    imageUrl: movieData.poster,
                    filmTitle: movieData.name,
                    filmLink: movieData.url
                };

                res.json(updatedFilmData);
            } catch (parseError) {
                console.error('Ошибка парсинга JSON:', parseError);
                res.status(500).json({ error: 'Ошибка парсинга JSON' });
            }
        });
    }


    async addFilmToTopK(req, res) {
        try {
            const { place, name, photo_link, rate, film_link, description } = req.body;

            await topkModel.create(place, name, photo_link, rate, film_link, description);

            res.status(200).json({ message: 'Фильм успешно добавлен в top-k!' });
        } catch (error) {
            console.error('Ошибка при добавлении фильма:', error);
            res.status(500).json({ error: 'Произошла ошибка при обработке запроса' });
        }

    }


    async addFilmToTopI(req, res) {
        try {
            const { place, name, photo_link, rate, film_link, description } = req.body;

            await topiModel.create(place, name, photo_link, rate, film_link, description);

            res.status(200).json({ message: 'Фильм успешно добавлен в top-i!' });
        } catch (error) {
            console.error('Ошибка при добавлении фильма:', error);
            res.status(500).json({ error: 'Произошла ошибка при обработке запроса' });
        }

    }


    async updateFilm(req, res) {
        try {
            const { id, place, name, photo_link, rate, film_link, description } = req.body;

            await topkModel.update(id, place, name, photo_link, rate, film_link, description);

            res.status(200).json({ message: 'Фильм успешно обновлен в top-k!' });
        } catch (error) {
            console.error('Ошибка при обновлении фильма:', error);
            res.status(500).json({ error: 'Произошла ошибка при обработке запроса' });
        }

    }


    async updateFilmTopI(req, res) {
        try {
            const { id, place, name, photo_link, rate, film_link, description } = req.body;

            await topiModel.update(id, place, name, photo_link, rate, film_link, description);

            res.status(200).json({ message: 'Фильм успешно обновлен в top-i!' });
        } catch (error) {
            console.error('Ошибка при обновлении фильма:', error);
            res.status(500).json({ error: 'Произошла ошибка при обработке запроса' });
        }

    }


    async deleteFilm(req, res) {
        try {
            const { id } = req.params;

            await topkModel.delete(id);

            res.status(200).json({ message: 'Фильм успешно удалён' });
        } catch (error) {
            console.error('Ошибка при удалении фильма:', error);
            res.status(500).json({ error: 'Произошла ошибка при обработке запроса' });
        }

    }

    async deleteFilmTopI(req, res) {
        try {
            const { id } = req.params;

            await topiModel.delete(id);

            res.status(200).json({ message: 'Фильм успешно удалён' });
        } catch (error) {
            console.error('Ошибка при удалении фильма:', error);
            res.status(500).json({ error: 'Произошла ошибка при обработке запроса' });
        }

    }


    async getPageFilm(req, res) {
        try {
            let page = req.query.page;
            if (!page || page < 1) page = 1;
            const pageSize = 10;
            const offset = (page - 1) * pageSize;


            const films = await topkModel.getAllFilm(pageSize, offset);

            const template = path.join(__dirname, '..', 'view', 'page.ejs');
            let html = await ejs.renderFile(template, { films, offset });

            res.send(html);

        } catch (error) {
            console.error('Ошибка maaan4:', error);
        }

    }


    async getPageFilmTopI(req, res) {
        try {
            let page = req.query.page;
            if (!page || page < 1) page = 1;
            const pageSize = 10;
            const offset = (page - 1) * pageSize;


            const films = await topiModel.getAllFilm(pageSize, offset);

            const template = path.join(__dirname, '..', 'view', 'page.ejs');
            let html = await ejs.renderFile(template, { films, offset });

            res.send(html);

        } catch (error) {
            console.error('Ошибка maaan1:', error);
        }

    }


    async getOneFilm(req, res) {
        try {
            let film_id = parseInt(req.query.film_id);

            const film = await topkModel.getOneFilm(film_id);

            const template = path.join(__dirname, '..', 'view', 'one-film.ejs');
            let html = await ejs.renderFile(template, { film });

            res.send(html);

        } catch (error) {
            console.error('Ошибка maaan2:', error);
        }

    }


    async getOneFilmTopI(req, res) {
        try {
            let film_id = parseInt(req.query.film_id);

            const film = await topiModel.getOneFilm(film_id);

            const template = path.join(__dirname, '..', 'view', 'one-film.ejs');
            let html = await ejs.renderFile(template, { film });

            res.send(html);

        } catch (error) {
            console.error('Ошибка maaan3:', error);
        }

    }

}

module.exports = new ApiController();
const path = require('path');
const ejs = require('ejs');
const { exec } = require('child_process');


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
        res.status(200).send('Данные успешно получены и обработаны.');
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

}

module.exports = new ApiController();
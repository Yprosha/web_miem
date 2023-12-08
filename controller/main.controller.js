const path = require('path');
const ejs = require('ejs');


class MainController{

    async getMain(req, res) {
        const template = path.join(__dirname, '..', 'view', 'main.ejs');
        let html = await ejs.renderFile(template);

        res.send(html);
    }

    async getAbout(req, res) {
        const template = path.join(__dirname, '..', 'view', 'about.ejs');
        let html = await ejs.renderFile(template);

        res.send(html);
    }

    async getContact(req, res) {
        const template = path.join(__dirname, '..', 'view', 'contact.ejs');
        let html = await ejs.renderFile(template);

        res.send(html);
    }

    async getRandom(req, res) {
        const template = path.join(__dirname, '..', 'view', 'random.ejs');
        let html = await ejs.renderFile(template);

        res.send(html);
    }

    async getHelpFilm(req, res) {
        const template = path.join(__dirname, '..', 'view', 'help-film.ejs');
        let html = await ejs.renderFile(template);

        res.send(html);
    }

    async getTarget(req, res) {
        const template = path.join(__dirname, '..', 'view', 'target.ejs');
        let html = await ejs.renderFile(template);

        res.send(html);
    }

    async getTopI(req, res) {
        const template = path.join(__dirname, '..', 'view', 'top-i.ejs');

        let pageNumber = req.query.page;
        if (!pageNumber || pageNumber < 1) pageNumber = 1;

        let html = await ejs.renderFile(template, { pageNumber });


        res.send(html);
    }

    async getTopK(req, res) {
        const template = path.join(__dirname, '..', 'view', 'top-k.ejs');

        let pageNumber = req.query.page;
        if (!pageNumber || pageNumber < 1) pageNumber = 1;

        let html = await ejs.renderFile(template, { pageNumber });

        res.send(html);
    }

    async getStat(req, res) {
        const template = path.join(__dirname, '..', 'view', 'stat.ejs');
        let html = await ejs.renderFile(template);

        res.send(html);
    }

    async getAddFilm(req, res) {
        const template = path.join(__dirname, '..', 'view', 'add-film.ejs');
        let html = await ejs.renderFile(template);

        res.send(html);
    }

    async getAddFilmTOPI(req, res) {
        const template = path.join(__dirname, '..', 'view', 'add-film.ejs');
        let html = await ejs.renderFile(template);

        res.send(html);
    }
}

module.exports = new MainController();
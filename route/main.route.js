const Router = require('express');
const router = new Router();
const mainController = require("../controller/main.controller");

router.get('/', mainController.getMain);
router.get('/about', mainController.getAbout);
router.get('/contact', mainController.getContact);
router.get('/random', mainController.getRandom);
router.get('/help-film', mainController.getHelpFilm);
router.get('/target', mainController.getTarget);
router.get('/top-i', mainController.getTopI);
router.get('/top-k', mainController.getTopK);
router.get('/stat', mainController.getStat);

router.get('/top-k/film/add', mainController.getAddFilm);
router.get('/top-i/film/add', mainController.getAddFilmTOPI);

module.exports = router;
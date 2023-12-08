const Router = require('express');
const router = new Router();
const apiController = require("../controller/api.controller");

// Графики и диаграммы

router.get('/visitor', apiController.getVisitor);
router.get('/movies/randomized', apiController.getMovieRandom);
router.get('/movies/top', apiController.getMovieTop);
router.get('/movies/help', apiController.getMovieHelp);
router.get('/people/confusion', apiController.getPeopleConfusion);

// Формы

router.post('/movies/help', apiController.postMovieHelp);
router.post('/feedback', apiController.postFeedback);
router.post('/thankyou', apiController.postThankYou);


// random

router.get('/random', apiController.getFilmRandom);



router.post('/top-k/film', apiController.addFilmToTopK);
router.get('/top-k/film', apiController.getPageFilm);
router.get('/top-k/one-film', apiController.getOneFilm);
router.put('/top-k/film', apiController.updateFilm);
router.delete('/top-k/film/:id', apiController.deleteFilm);

router.post('/top-i/film', apiController.addFilmToTopI);
router.get('/top-i/film', apiController.getPageFilmTopI);
router.get('/top-i/one-film', apiController.getOneFilmTopI);
router.put('/top-i/film', apiController.updateFilmTopI);
router.delete('/top-i/film/:id', apiController.deleteFilmTopI);


module.exports = router;
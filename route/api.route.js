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


module.exports = router;
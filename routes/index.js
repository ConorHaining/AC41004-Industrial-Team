var express = require('express');
var router = express.Router();

const timetable = require('../app/timetable');
const desks = require('../app/desks');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/wrld3d', function(req, res, next){
  res.render('wrld3d');
});

router.get('/noiseGenerator', function(req, res, next) {
  res.render('noiseGenerator');
});

router.get('/graphTest', function(req, res, next) {
  res.render('graphTest');
});

router.get('/timetable/:room', (req, res) => {
  res.send(timetable.getTimetableByRoom(req.params['room']));
});
router.get('/timetable/:room/today', (req, res) => {
  timetable.getTimetableByRoomToday(req.params['room'], (html) => {
    res.send(html);
  });
});

router.get('/desks', (req, res) => {
  desks.getCurrentDeskUsage((occupancy) => {
    res.send(occupancy);
  });
});

module.exports = router;

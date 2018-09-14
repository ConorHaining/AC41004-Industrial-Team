var express = require('express');
var router = express.Router();

const timetable = require('../app/timetable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/timetable/:room', (req, res) => {
  res.send(timetable.getTimetableByRoom(req.params['room']));
});
router.get('/timetable/:room/today', (req, res) => {
  res.send(timetable.getTimetableByRoomToday(req.params['room']));
});

module.exports = router;

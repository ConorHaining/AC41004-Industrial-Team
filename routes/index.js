var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/wrld3d', function(req, res, next){
  res.render('wrld3d');
});

router.get('/testing', function(req, res, next){
  res.render('testing');
});

module.exports = router;

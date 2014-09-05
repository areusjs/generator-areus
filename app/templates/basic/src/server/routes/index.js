var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {});
});

router.get('/_health', function(req, res) {
  res.send(200);
});

module.exports = router;
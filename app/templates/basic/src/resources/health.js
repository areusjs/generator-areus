module.exports = Health;

function Health() {
}

Health.$inject = [];

Health.prototype.route = function (router) {
  router.get('/', function (req, res, next) {
    res.send(200);
  });
};
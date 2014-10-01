module.exports = Index;

function Index() {
}

Index.$inject = [];

Index.prototype.route = function (router) {
  router.get('/', function (req, res, next) {
    res.render('index', {});
  });
};
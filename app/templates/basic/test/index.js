var srvPath = '../src',
  should = require('should'),
  request = require('supertest');

describe('index', function () {

  it('should show index page', function (done) {
    var app = require(srvPath)();
    request(app)
      .get('/')
      .expect('Content-Type', /text\/html/)
      .expect(200, done);
  });

  it('should return 200 from _health', function (done) {
    var app = require(srvPath)();
    request(app)
      .get('/_health')
      .expect('Content-Type', /text\/plain/)
      .expect(200, done);
  });

  it('should show error page', function (done) {
    var app = require(srvPath)();
    request(app)
      .get('/this-path-does-not-exist')
      .expect('Content-Type', /text\/html/)
      .expect(404)
      .end(function(err, res){
        if (err) return done(err);
        res.error.should.be.ok;
        done()
      });
  });

  it('should show error page in prod', function (done) {
    process.env.NODE_ENV='production';
    var app = require(srvPath)();
    request(app)
      .get('/this-path-does-not-exist')
      .expect('Content-Type', /text\/html/)
      .expect(404)
      .end(function(err, res){
        if (err) return done(err);
        res.error.should.be.ok;
        done()
      });
  });

  afterEach(function() {
    process.env.NODE_ENV='';
  });

});

const request = require("supertest");
const assert = require('chai').assert;

app = require('../src/app');
const agent = request.agent(app);

describe('GET /groups', () => {
  before(function (done) {
    app.on('appStarted', function(){
        done();
    });
  });

  it('return group', done => {
    agent.get('/groups/1').expect('Content-Type', /json/).expect(200).end((err, res) => {
      if(res.body)
        return done()
    });
  });
  it('return groups', done => {
    agent.get('/groups').expect('Content-Type', /json/).expect(200).end((err, res) => {
      if(res.body)
        return done()
    });
  });
  it('add user', done => {
    agent.post('/groups/2/users/1').expect('Content-Type', /json/).expect(200).end((err, res) => {
      if(res.body)
        return done()
    });
  });
  it('remove user', done => {
    agent.delete('/groups/2/users/1').expect('Content-Type', /json/).expect(200).end((err, res) => {
      if(res.body)
        return done()
    });
  });
});

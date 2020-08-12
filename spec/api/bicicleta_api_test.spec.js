const mongoose = require('mongoose');
const Bicicleta = require('../../models/bicicleta');
const request = require('request');
const server = require('../../bin/www');

const base_url = 'http://localhost:3000/api/bicicletas'

describe('Bicicletas API', () => {
  beforeEach(done => {
    const mongoDb = 'mongodb://localhost/testdb';
    mongoose.connect(mongoDb, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
        console.log('We are connected to test database!');
        done();
    });
  });

  afterEach(done => {
    Bicicleta.deleteMany({}, (err, success) => {
        if(err) console.log(err);
        done();
    });
  });

  describe('GET BICICLETAS /', () => {
    it('status 200', (done) => {
      request.get(base_url, (error, response, body) => {
        const result = JSON.parse(body);
        expect(response.statusCode).toBe(200);
        // expect(result.bicicletas.length).toBe(0);
        done()
      })
    })
  })


})

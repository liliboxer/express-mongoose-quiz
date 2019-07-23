require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');


describe('bunny routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  // create
  it('create a bunny', () => {
    return request(app)
      .post('/api/v1/bunnies')
      .send({ 
        name: 'Chester', 
        breed: 'mini lop',
        age: 4,
        fluffy: true
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: 'Chester', 
          breed: 'mini lop',
          age: 4,
          fluffy: true
        });
      });
  });

  // read

  // update 

  // delete 

  
});

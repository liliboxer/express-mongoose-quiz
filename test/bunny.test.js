require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

const Bunny = require('../lib/models/Bunny');

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
  it('gets all bunnies', async() => {
    const bunnies = JSON.parse(JSON.stringify(await Bunny.create([
      { name: 'Chester', breed: 'mini lop', age: 4, fluffy: true },
      { name: 'Reuben', breed: 'jackrabbit', age: 1, fluffy: true },
      { name: 'Snax', breed: 'lionhead', age: 3, fluffy: false },
    ])));
    return request(app)
      .get('/api/v1/bunnies')
      .then(res => {
        expect(res.body).toEqual(bunnies);
      });
  });

  // update 

  // delete 

  
});

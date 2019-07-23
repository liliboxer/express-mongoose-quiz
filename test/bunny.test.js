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
    const bunnies = await Bunny.create([
      { name: 'Chester', breed: 'mini lop', age: 4, fluffy: true },
      { name: 'Reuben', breed: 'jackrabbit', age: 1, fluffy: true },
      { name: 'Snax', breed: 'lionhead', age: 3, fluffy: false },
    ]);
    return request(app)
      .get('/api/v1/bunnies')
      .then(res => {
        const bunniesJSON = JSON.parse(JSON.stringify(bunnies));
        bunniesJSON.forEach(bunny => {
          expect(res.body).toContainEqual(bunny);
        });
      });
  });

  // update 
  it('PATCH part of bunny', async() => {
    const bunny = await Bunny.create({        
      name: 'Chester', 
      breed: 'mini lop',
      age: 4,
      fluffy: true 
    });
    return request(app)
      .patch(`/api/v1/bunnies/${bunny._id}`)
      .send({ age: 5 })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: 'Chester', 
          breed: 'mini lop',
          age: 5,
          fluffy: true
        });
      });
  });

  // delete 

  
});

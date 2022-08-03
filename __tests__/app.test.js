const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('should return get a list of books', async () => {
    const res = await request(app).get('/books');
    expect (res.body.length).toEqual(11);
    const gondor = res.body[0];
    expect(gondor).toHaveProperty('title', 'Straight Outa Gondor');
    expect(gondor).toHaveProperty('id');
    expect(gondor).toHaveProperty('released');
  });

  afterAll(() => {
    pool.end();
  });
});

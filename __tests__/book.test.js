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

  it('#GET books/:id should return a book by id', async () => {
    const res = await request(app).get('/books/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', '1');
    expect(res.body).toHaveProperty('title', 'Straight Outa Gondor');
    expect(res.body).toHaveProperty('released', 2015);
    expect(res.body.authors[0]).toHaveProperty('id');
    expect(res.body.authors[0]).toHaveProperty('name');
    expect(res.body.authors[0]).toHaveProperty('dob');
    expect(res.body.authors[0]).toHaveProperty('pob');
  });



  it('#POST /should add a new book', async () => {

    const newBook = {
      title: 'Bananas',
      released: 1999
    };

    const res = await request(app).post('/books').send(newBook);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newBook,
    });

  });

  afterAll(() => {
    pool.end();
  });
});

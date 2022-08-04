const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const e = require('express');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  

  it('#GET should return a list of authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: '1',
        name: 'Brian Thomas',
        dob: 1892,
        pob: 'Toronto, Canada'
      },
      { id: '2',
        name: 'Kat Zaro',
        dob: 1744,
        pob: 'Zagreb, Croatia'
      },
      { id: '3',
        name: 'Amanda Hecht',
        dob: 1910,
        pob: 'Zurich, Switzerland'
      },
      { id: '4',
        name: 'Amaya Alejandra',
        dob: 1689,
        pob: 'Tunis, Tunisia'
      },
      { id: '5',
        name: 'Austin Han',
        dob: 1933,
        pob: 'Astoria, OR'
      },
      { id: '6',
        name: 'David Francisco',
        dob: 1922,
        pob: 'New Orleans, LA'
      }
    ]);
  });

  it('#GET authors/:id should return an author by id', async () => {
    const res = await request(app).get('/authors/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', '1');
    expect(res.body).toHaveProperty('name', 'Brian Thomas');
    expect(res.body).toHaveProperty('dob', 1892);
    expect(res.body).toHaveProperty('pob', 'Toronto, Canada');
    expect(res.body.books[0]).toHaveProperty('id');
    expect(res.body.books[0]).toHaveProperty('title');
    expect(res.body.books[0]).toHaveProperty('released');
  });

  it('#POST /should add a new author', async () => {
    
    const newAuthor = {
      name: 'Mariah Schock',
      dob: 1888,
      pob: 'Bogota, Columbia'
    };

    const res = await request(app).post('/authors').send(newAuthor);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newAuthor,
    });
  });

  afterAll(() => {
    pool.end();
  });
});

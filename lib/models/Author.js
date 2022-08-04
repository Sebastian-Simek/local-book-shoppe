const pool = require('../utils/pool');

class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM authors'
    );
    return rows.map((row) => new Author(row));
  }

  async getBooks() {
    const { rows } = await pool.query(
      `SELECT books.*
      FROM books
      INNER JOIN author_books on books.id = author_books.book_id
      INNER JOIN authors on authors.id = author_books.author_id
      WHERE authors.id = $1`, [this.id]
    );
    this.books = rows;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT authors.*
      FROM authors
      WHERE authors.id = $1
      GROUP BY authors.id`, [id]
    );
    return new Author(rows[0]);

  }
  
  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(
      `INSERT INTO authors 
      (name, dob, pob)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
      [name, dob, pob]
    );
    return new Author(rows[0]);
  }
}

module.exports = Author;

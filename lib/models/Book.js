const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM books'
    );
    return rows.map((row) => new Book(row));
  }

  async getAuthors() {
    const { rows } = await pool.query(
      `SELECT authors.*
      FROM authors
      INNER JOIN author_books on author_books.author_id = authors.id
      INNER JOIN books on author_books.book_id = books.id
      WHERE authors.id = $1`, [this.id]
    );
    console.log(rows);
    this.authors = rows;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `Select books.*
      FROM books
      WHERE books.id = $1
      GROUP BY books.id`, [id]
    );
    console.log(rows);
    return new Book(rows[0]);
  }

  static async insert({ title, released}) {
    const { rows } = await pool.query(
      `INSERT INTO BOOKS (title, released)
      VALUES ($1, $2)
      RETURNING *
      `,
      [title, released]
    );
    return new Book(rows[0]);
  }
}





module.exports = { Book };

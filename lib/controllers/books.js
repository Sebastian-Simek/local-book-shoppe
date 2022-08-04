const { Router } = require('express');
const { Book } = require('../models/Book');

module.exports = Router()
  .get('/', async (req, res) => {
    const book = await Book.getAll();
    res.json(book);
  })
  .get('/:id', async (req, res) => {
    const bookId = await Book.getById(req.params.id);
    await bookId.getAuthors();
    res.json(bookId);
  })
  .post('/', async (req, res) => {
    const newBook = await Book.insert(req.body);
    res.json(newBook);
  });

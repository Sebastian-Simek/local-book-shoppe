const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .get('/', async (req, res) => {
    const author = await Author.getAll();
    res.json(author);
  })
  .get('/:id', async (req, res) => {
    const authorId = await Author.getById(req.params.id);
    await authorId.getBooks();
    res.json(authorId);
  })
  .post('/', async (req, res) => {
    const newAuthor = await Author.insert(req.body);
    res.json(newAuthor);
  });

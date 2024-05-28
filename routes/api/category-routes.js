const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const result = await Category.findAll({
    include: Product
  });
  res.json(result);
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const result = await Category.findByPk(
    req.params.id,
    {
      include: Product
    });
  res.json(result);
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  const result = await Category.create({
    category_name: req.body.category_name
  });
  res.json(result);
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;

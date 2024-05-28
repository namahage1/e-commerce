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

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryId = req.params.id;
  const updatedData = req.body;
  try {
    const category = await Category.findByPk(categoryId);
  if(!category){
    return res.status(404).json({message:'Category not found'});
  }

  await category.update(updatedData);
  res.json(category);
  }catch(error){
    console.error(error);
    res.status(500).json({message:'Internal Service Error'});
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData = await Category.destroy({
      where:{
        id:req.params.id
      }
    });
    if(!categoryData){
      res.status(404).json({message:'Category not found'});
      return;
    }
    res.status(200).json(categoryData);
  }catch(error){
    console.error(error);
    res.status(500).json({message:'Internal Service Error'});
  }
});

module.exports = router;

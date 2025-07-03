const Product = require('../models/Product');

const getAll = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

const getById = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
  res.json(product);
};

const create = async (req, res) => {
  const { name, price, category, image, description } = req.body;
  const product = await Product.create({ name, price, category, image, description });
  res.status(201).json(product);
};

const update = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

  await product.update(req.body);
  res.json(product);
};

const remove = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

  await product.destroy();
  res.json({ message: 'Produto removido com sucesso' });
};

module.exports = { getAll, getById, create, update, remove };

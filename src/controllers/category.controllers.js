import * as categoryService from "../services/categoryService.js";

export const getAll = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
};

export const getById = async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json(category);
};

export const create = async (req, res) => {
  const { name, description } = req.body;
  const newCategory = await categoryService.createCategory({ name, description });
  res.status(201).json(newCategory);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const updated = await categoryService.updateCategory(id, req.body);
  res.json(updated);
};

export const remove = async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  res.status(204).send();
};

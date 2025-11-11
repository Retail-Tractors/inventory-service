import * as itemService from "../services/itemService.js";

export const getAll = async (req, res) => {
  const items = await itemService.getAllItems();
  res.json(items);
};

export const getById = async (req, res) => {
  const item = await itemService.getItemById(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
};

export const create = async (req, res) => {
  const newItem = await itemService.createItem(req.body);
  res.status(201).json(newItem);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const updated = await itemService.updateItem(id, req.body);
  res.json(updated);
};

export const remove = async (req, res) => {
  await itemService.deleteItem(req.params.id);
  res.status(204).send();
};

import prisma from "../config/db.js";

const getAllItems = async () => {
  return prisma.item.findMany();
};

const getItemById = async (id) => {
  return prisma.item.findUnique({
    where: { id },
  });
};

const getItemsByCategoryId = async (categoryId) => {
  return prisma.item.findMany({
    where: {
      categoryId,
    },
  });
};

const createItem = async (data) => {
  return prisma.item.create({
    data,
  });
};

const updateItem = async (id, data) => {
  return prisma.item.update({
    where: { id },
    data,
  });
};

const deleteItem = async (id) => {
  return prisma.item.delete({
    where: { id },
  });
};

export default {
  getAllItems,
  getItemById,
  getItemsByCategoryId,
  createItem,
  updateItem,
  deleteItem,
};

import { PrismaClient } from "@prisma/client";
import logger from "../utils/logger.js";

const prisma = new PrismaClient();

export const getAllCategories = async () => {
  logger.info("Fetching all categories");

  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (err) {
    logger.error(`Failed to fetch categories: ${err.message}`);
    throw new Error("Could not fetch categories");
  }
};

export const getCategoryById = async (id) => {
  logger.info(`Fetching category with id ${id}`);

  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      logger.warn(`Category with id ${id} not found`);
      throw new Error("Category not found");
    }

    return category;
  } catch (err) {
    logger.error(`Failed to fetch category ${id}: ${err.message}`);
    throw err;
  }
};

export const createCategory = async (data) => {
  logger.info("Creating category");

  try {
    const created = await prisma.category.create({ data });
    logger.info(`Category created with id ${created.id}`);
    return created;
  } catch (err) {
    logger.error(`Failed to create category: ${err.message}`);
    throw new Error("Could not create category");
  }
};

export const updateCategory = async (id, data) => {
  logger.info(`Updating category with id ${id}`);

  try {
    const updated = await prisma.category.update({
      where: { id: Number(id) },
      data,
    });

    return updated;
  } catch (err) {
    if (err.code === "P2025") {
      logger.warn(`Attempted to update non-existent category ${id}`);
      throw new Error("Category not found");
    }

    logger.error(`Failed to update category ${id}: ${err.message}`);
    throw new Error("Could not update category");
  }
};

export const deleteCategory = async (id) => {
  logger.info(`Deleting category with id ${id}`);

  try {
    await prisma.category.delete({
      where: { id: Number(id) },
    });

    logger.info(`Category ${id} deleted`);
    return true;
  } catch (err) {
    if (err.code === "P2025") {
      logger.warn(`Attempted to delete non-existent category ${id}`);
      throw new Error("Category not found");
    }

    logger.error(`Failed to delete category ${id}: ${err.message}`);
    throw new Error("Could not delete category");
  }
};

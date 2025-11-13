import { PrismaClient } from "@prisma/client";
import logger from "../utils/logger.js";

const prisma = new PrismaClient();

export const getAllItems = async () => {
  logger.info("Fetching all items");

  try {
    const items = await prisma.item.findMany();
    return items;
  } catch (err) {
    logger.error(`Failed to fetch items: ${err.message}`);
    throw new Error("Could not fetch items");
  }
};

export const getItemById = async (id) => {
  logger.info(`Fetching item with id ${id}`);

  try {
    const item = await prisma.item.findUnique({
      where: { id: Number(id) }
    });

    if (!item) {
      logger.warn(`Item with id ${id} not found`);
      throw new Error("Item not found");
    }

    return item;
  } catch (err) {
    logger.error(`Failed to fetch item ${id}: ${err.message}`);
    throw err;
  }
};

export const createItem = async (data) => {
  logger.info("Creating item");

  try {
    const created = await prisma.item.create({ data });
    logger.info(`Item created with id ${created.id}`);
    return created;
  } catch (err) {
    logger.error(`Failed to create item: ${err.message}`);
    throw new Error("Could not create item");
  }
};

export const updateItem = async (id, data) => {
  logger.info(`Updating item with id ${id}`);

  try {
    const updated = await prisma.item.update({
      where: { id: Number(id) },
      data
    });

    return updated;
  } catch (err) {
    if (err.code === "P2025") {
      logger.warn(`Attempted to update non-existent item ${id}`);
      throw new Error("Item not found");
    }

    logger.error(`Failed to update item ${id}: ${err.message}`);
    throw new Error("Could not update item");
  }
};

export const deleteItem = async (id) => {
  logger.info(`Deleting item with id ${id}`);

  try {
    await prisma.item.delete({
      where: { id: Number(id) }
    });

    logger.info(`Item ${id} deleted`);
    return true;
  } catch (err) {
    if (err.code === "P2025") {
      logger.warn(`Attempted to delete non-existent item ${id}`);
      throw new Error("Item not found");
    }

    logger.error(`Failed to delete item ${id}: ${err.message}`);
    throw new Error("Could not delete item");
  }
};

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllItems = async () => prisma.item.findMany({
  include: { category: true },
});

export const getItemById = async (id) =>
  prisma.item.findUnique({
    where: { id: Number(id) },
    include: { category: true },
  });

export const createItem = async (data) =>
  prisma.item.create({ data });

export const updateItem = async (id, data) =>
  prisma.item.update({ where: { id: Number(id) }, data });

export const deleteItem = async (id) =>
  prisma.item.delete({ where: { id: Number(id) } });

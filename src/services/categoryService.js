import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCategories = async () => prisma.category.findMany();

export const getCategoryById = async (id) =>
  prisma.category.findUnique({ where: { id: Number(id) } });

export const createCategory = async (data) =>
  prisma.category.create({ data });

export const updateCategory = async (id, data) =>
  prisma.category.update({ where: { id: Number(id) }, data });

export const deleteCategory = async (id) =>
  prisma.category.delete({ where: { id: Number(id) } });

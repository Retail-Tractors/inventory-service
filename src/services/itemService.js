import prisma from "../config/db.js";
import axios from "axios";


export const getItemReviews = async (itemId, page = 1, pageSize = 5) => {
  const offset = (page - 1) * pageSize;

  const { data } = await axios.get(`http://reviews-service:3006/reviews/equipment/${itemId}`, {
      params: {
        limit: pageSize,
        offset,
      },
    }
  );

  return data;
};

export const getAverageRating = async (itemId) => {
  const { data } = await axios.get(
    `http://reviews-service:3006/reviews/equipment/${itemId}/average`
  );

  return data.averageRating;
};

const getAllItems = async () => {
  return prisma.item.findMany();
};

const getItemById = async (id, reviewsOptions = null) => {
  const item = await prisma.item.findUnique({
    where: { id },
  });

  if (!item) return null;

  if (!reviewsOptions) {
    return item;
  }

  const { page = 1, pageSize = 5 } = reviewsOptions;

  const [reviewsData, averageRating] = await Promise.all([
    getItemReviews(id, page, pageSize),
    getAverageRating(id),
  ]);

  return {
    ...item,
    reviews: reviewsData.reviews,
    totalReviews: reviewsData.total,
    averageRating,
  };
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

import { GraphQLError } from "graphql";

export const resolvers = {
  Query: {
    categories: async (_, __, context) => {
      context.logger.info("Query: categories");
      return context.services.category.getAllCategories();
    },

    category: async (_, { id }, context) => {
      context.logger.info(`Query: category id=${id}`);
      return context.services.category.getCategoryById(id);
    },

    items: async (_, __, context) => {
      context.logger.info("Query: items");
      return context.services.item.getAllItems();
    },

    item: async (_, { id }, context) => {
      context.logger.info(`Query: item id=${id}`);
      return context.services.item.getItemById(parseInt(id));
    },
  },

  Mutation: {
    createCategory: async (_, { data }, context) => {
      context.logger.info("Mutation: createCategory");
      return context.services.category.createCategory(data);
    },

    updateCategory: async (_, { id, data }, context) => {
      context.logger.info(`Mutation: updateCategory id=${id}`);
      return context.services.category.updateCategory(id, data);
    },

    deleteCategory: async (_, { id }, context) => {
      context.logger.info(`Mutation: deleteCategory id=${id}`);
      return context.services.category.deleteCategory(id);
    },

    createItem: async (_, { data }, context) => {
      context.logger.info("Mutation: createItem");

      if (!context.auth?.userId) {
        throw new GraphQLError("Unauthorized", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      const dataWithUser = { ...data, userId: context.auth.userId };
      return context.services.item.createItem(dataWithUser);
    },

    updateItem: async (_, { id, data }, context) => {
      context.logger.info(`Mutation: updateItem id=${id}`);
      return context.services.item.updateItem(id, data);
    },

    deleteItem: async (_, { id }, context) => {
      context.logger.info(`Mutation: deleteItem id=${id}`);
      return context.services.item.deleteItem(id);
    },
  },

  Category: {
    items: async (parent, _, context) => {
      context.logger.info(
        `Resolving Category.items for categoryId=${parent.id}`
      );

      return context.services.item.getItemsByCategoryId(parent.id);
    },
  },

  Item: {
    category: async (parent, _, context) => {
      context.logger.info(
        `Resolving Item.category for categoryId=${parent.categoryId}`
      );

      return context.services.category.getCategoryById(parent.categoryId);
    },
  },
};

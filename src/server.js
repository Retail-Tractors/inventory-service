import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import logger from "./utils/logger.js";
import * as categoryService from "./services/categoryService.js";
import * as itemService from "./services/itemService.js";

dotenv.config();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false, // desativa o CSRF
    formatError: (err) => {
      if (err.message.includes("must contain a non-empty")) {
        return err;
      }

      logger.error(`GraphQL Error: ${err.message}`);
      return err;
    },
  });

  const PORT = process.env.PORT || 3001;

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async () => {
      const start = Date.now();

      return {
        logger,
        services: {
          category: categoryService,
          item: itemService,
        },
        onExecutionEnd: () => {
          const duration = Date.now() - start;
          logger.info(`Request completed in ${duration}ms`);
        },
      };
    },
  });

  logger.info(`GraphQL Inventory Service running at ${url}`);
}

startServer();

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import dotenv from "dotenv";
import { GraphQLError } from "graphql";
import { resolvers } from "./graphql/resolvers.js";
import logger from "./utils/logger.js";
import * as categoryService from "./services/categoryService.js";
import itemService from "./services/itemService.js";
import { jwtVerify, createRemoteJWKSet } from "jose";

const typeDefs = readFileSync("./src/graphql/schema.graphql", "utf8");

// JWT setup - it fetches public keys from JWKS endpoint from users-service
const JWKS_URL = new URL(process.env.JWKS_URL);
const jwks = createRemoteJWKSet(JWKS_URL);

async function getAuthFromReq(req) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  // if (!token) return null;

  try {
    const { payload, protectedHeader } = await jwtVerify(token, jwks, {
      issuer: 'retail-tractors-users-service',
      audience: 'retail-tractors-users',
      algorithms: ['RS256'],
    });

    return {
      jwt: payload,
      kid: protectedHeader.kid,
      userId: parseInt(payload.sub),
      email: payload.email,
      name: payload.name,
    };
  } catch (e) {
    logger.error({ code: e.code, message: e.message, cause: e.cause }, "JWT verify failed");
    throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
  }
}

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
    context: async ({ req }) => {
      const start = Date.now();
      const auth = await getAuthFromReq(req);

      return {
        logger,
        auth,
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

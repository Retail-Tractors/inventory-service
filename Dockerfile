FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema
COPY prisma ./prisma

# Generate the Prisma Client
RUN npx prisma generate

COPY . .

EXPOSE 3003
CMD ["npm", "start"]

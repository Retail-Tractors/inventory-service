FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3003

CMD ["sh", "-c", "npx prisma generate && npm start"]

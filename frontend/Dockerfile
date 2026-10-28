FROM node:20-slim

WORKDIR /app/frontend

# Install dependencies first for better layer caching
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 600000

# Copy the rest of the source
COPY . .

EXPOSE 3000

CMD ["yarn", "start"]

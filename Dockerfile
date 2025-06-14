FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
ENV NODE_ENV=development \
    PORT=5173
EXPOSE $PORT
RUN if [ "$NODE_ENV" = "production" ]; then \
        npm install --only=production; \
    else \
        npm install; \
    fi
COPY . .
CMD if [ "$NODE_ENV" = "production" ]; then \
        npm run start; \
    else \
        npm run dev; \
    fi
FROM npm:latest
WORKDIR /app
COPY package.json package-lock.json ./
ENV NODE_ENV development \
    PORT 5173
EXPOSE $PORT
RUN npm install -g yarn
RUN if [ "$NODE_ENV" = "production" ]; then \
        yarn install --production; \
    else \
        yarn install; \
    fi
COPY . .
CMD if [ "$NODE_ENV" = "production" ]; then \
        yarn start; \
    else \
        yarn dev; \
    fi
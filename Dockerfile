FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm ci

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY . .

RUN if [ "$NODE_ENV" = "production" ] || [ "$NODE_ENV" = "test" ]; then \
    npm run build; \
  fi

EXPOSE 3000

CMD if [ "$NODE_ENV" = "development" ]; then \
    npm run dev; \
  elif [ "$NODE_ENV" = "test" ]; then \
    npm run test; \
  else \
    npm run start; \
  fi

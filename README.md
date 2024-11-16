# NodeJS application

## Running App in Docker
Install docker following guide https://docs.docker.com/

Available *mode* options: `production` `development` `test`

cross-env NODE_ENV=*mode* docker compose build
docker compose up

cross-env NODE_ENV=*mode* docker compose up --build

## Running App locally
Install mongo dababase locally and respectively configure `MONGO_URI_LOCAL` in env files

- `npm run dev:local` starts app on localhost `PORT` using database `MONGO_URI_LOCAL`

- `npm run test:local` running integration tests and e2e tests using database `MONGO_URI_LOCAL`

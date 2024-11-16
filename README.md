# NodeJS application

## Running App in Docker
Install [Docker](https://docs.docker.com/)

Available *mode* options: 
- `production` 
- `development` 
- `test`

To build an image use this command<br/>
`cross-env NODE_ENV=<mode> docker compose build`

Then you can start the container<br/>
`docker compose up`

Also you can use single command to build and run the container</br>
`cross-env NODE_ENV=<mode> docker compose up --build`

## Running App locally

Install [NodeJS](https://nodejs.org/en) <br/>
Install Mongo dababase locally [MongoDB Compass](https://www.mongodb.com/products/tools/compass) <br/>
Respectively configure `MONGO_URI_LOCAL` in env files<br/>
Install packages `npm i`

- `npm run dev:local` starts app on localhost `PORT` using database `MONGO_URI_LOCAL`

- `npm run test:local` running integration tests and e2e tests using database `MONGO_URI_LOCAL`

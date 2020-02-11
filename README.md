# stockx-docker

Requirements:
[Docker Desktop](https://www.docker.com/products/docker-desktop/).

Overview: 
Node.js runtime w/Express.js + Postgresql

This app supports both production and development modes please see (docker-compose.yml & docker-compose-prod.yml).

Run in Development:
```
docker-compose up
```
To run the database migration (load the tables/insert some data)
```
docker-compose run app bash
npm run migrate up
```
To roll back database migration
```
docker-compose run app bash
npm run migrate down
```
Note: database migrations are stored in .migrate.

----------------------------------------------------

Run in Production:
```
docker-compose -f docker-compose-prod.yml up
```

----------------------------------------------------

API Reference:

POST  /api/collect/fit - Post fit data in json format 
GET   /api/data/shoes - Retrieve shoes data from the database
GET   /api/data/fits/:id - Get fit data by shoeId 
GET   /api/metrics/true-to-size/:id - Get trueToSizeCalculation by shoeId

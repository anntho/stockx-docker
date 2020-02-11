# stockx-docker

Requirements:
[Docker Desktop]((https://pages.github.com/))

Overview: 
Node.js runtime w/Express.js + Postgresql
This app supports both production and development modes.
Prod and Dev environments are controlled by docker-compose files

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
Note: database migrations are stored in .migrate

----------------------------------------------------

Run in Production:
```
docker-compose -f docker-compose-prod.yml up
```
Note: For the purpose of this demo log files persist in production mode

# About this project
It's a challenge to work as a software engineer at Novatics

## Getting Started
### Prerequisites
This project works with Docker, more information can be found [here](https://docs.docker.com/get-docker/).

### Installing (Docker)
1. The project uses environment variables, rename the **.env.example** file to **.env** and set up your environment
2. To get the Mongo IP address in the Docker, run the command:
 ```
docker network inspect challenge_backend
 ```
2. Run Docker
 ```
docker-compose up
 ```
3. For testing purposes, restore the mongo database with the command: 
 ```
docker-compose exec -T mongodb sh -c 'mongorestore --username=root --password=challenge --archive' < dumps/db.dump
 ```
### Installing (Without Docker)
1. The project uses environment variables, rename the **.env.example** file to **.env**
2. Install the dependencies
 ```
npm install
 ```
3. For testing purposes, restore the mongo database with the command: 
 ```
mongorestore --username=root --password=challenge --archive < dumps/db.dump
 ```
 4. Run the project
 ```
npm run dev
 ```

## Documentation
The API uses Swagger for documenting endpoints and validating application input and output data. 
Swagger can help you design and document your APIs at scale.
More information can be found [here](https://swagger.io/).

Swagger provides documentation that can be accessed at:
  ```
  http://localhost:3000/docs
  ```
 ![doc](https://user-images.githubusercontent.com/2119725/81845084-6d1af300-9526-11ea-9007-ce3b3f53049e.png)

## Features
 - User login
 - Lists all BBB participants
 - Distribute user kudos

## Dependencies
 - [Node](https://nodejs.org/en/)
 - [MongoDB](https://www.mongodb.com/)
 - [ESlint](https://eslint.org/)
 - [NPM](https://www.npmjs.com/)
 - (Optional) [Docker](https://www.docker.com/)
## Security
 - The API uses **JSON Web Token (JWT)** as security in the communication

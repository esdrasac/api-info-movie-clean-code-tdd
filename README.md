# :rocket: Info Movie API

This api is able to search for films from a public database and find its translations and save it in a database in its own docker container, and was developed by Esdras Aguilar using TDD and Clean Architecture.

## :vertical_traffic_light: Getting Started

Follow this instructions to run the project

### :minidisc: Installing

We recommend using Yarn, but you can use npm

  **Locally**
 
  * You need to install the dependencies: 
  
    **Using NPM:**
    ```
    npm install
    ```
    **Using Yarn:**
    ```
    yarn install
    ```
    * Rename the file ".env.default" to ".env" and setup enviroment variables to connect to MongoDb and config port server.
    
  * Start the application:
  
    **Using NPM:**
    ```
    npm start
    ```
    **Using Yarn:**
    ```
    yarn start
    ```

  **Docker**

   * First you need to have the [Docker](https://hub.docker.com/_/node/) and [Docker-Compose](https://docs.docker.com/compose/install/) installed on your computer;

   * Rename the file ".env.default" to ".env" and setup enviroment variables to connect to MongoDb and config port server. PS.: If you can not connect in mongodb, run this CMD to find docker IP and put in MONGO_HOST variable:
    ```
    docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' db
    ```

  * And finally:

    ```
    docker-compose up
    ```
    
## :minidisc: DOCs
  You can see the [docs](https://github.com/esdrasac/api-info-movie-clean-code-tdd/blob/master/public/docs/) and Insomnia Collection for details.

## :minidisc: Units and Integrations tests  
  This application is 100% tested ![tested](https://github.com/esdrasac/api-info-movie-clean-code-tdd/blob/master/public/assets/tests.png)



## :hammer: Built With

* [NodeJS](https://nodejs.org/en/docs/) - Runtime;
* [Docker](https://hub.docker.com/_/node/) - Conteiners;
* [ExpresJS](https://expressjs.com/) - Web Framework;
* [MongooseJS](https://mongoosejs.com/) - Used to manage NoSQL data(ODM);
* [Jest](https://jestjs.io/) - Used to tests;

## Versioning

1.0.0

## Authors

* **Esdras Aguilar** - *Initial work* - [esdrasac](https://github.com/esdrasac)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/esdrasac/chatbot/blob/master/LICENSE) file for details

## Acknowledgments

* To God for his infinite goodness
* To my college teachers
* To my parents

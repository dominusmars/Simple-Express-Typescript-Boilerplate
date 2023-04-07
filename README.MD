### EXPRESS TYPESCRIPT BOILERPLATE


## Reason for making this

    I wanted a simple and easy to used boilderplate that just had basic functionality and easy to modify. I created models which give descriptions to endpoints.


## HOW TO USE

    There are three models for endpoints located in ./src/models. Routing is for a router model which takes in a express router. Route is a single route or endpoint. and Page returns a page.

    Its important to note that under the ./src/api dir all the js files will be read so making sure there either Routing or Route modules is very important. 

    All api endpoints will start with /api to insure they are on different levels

    All page endpoints will be on the main level. Note do not clash endpoints when making them.



## How to start

    This package uses yarn as its package manager. 

    ```
    yarn install
    ```
    this will install all needed packages

    After cp .env.example to a file called .env. this will contain your environment varibles

## Running the program

    use the command
    ```
    yarn run dev
    ```
    this will launch a dev server running the express server. It should refresh everytime you save a file

    use the command
    ```
    yarn run prod
    ```
    this will compile the typescript into javascript for production and run the program. 
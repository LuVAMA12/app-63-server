
# APP 63 🍴
« Le 63 » is an emblematic restaurant in Orsay.

Its website, meanwhile, is an online reservation  manager. this allows customers to select the table and time of reservation . 
It also offers an interactive menu for ordering à la carte items to take away. 

## Prerequisites

This application uses a database in SQL format.

To be able to start it, you will therefore need to supply the database in mySQL format.

## 📚 The technical stack

The site is made up of two parts: **the <ins>front-end </ins> and the <ins>back-end</ins>**.


### FRONT-END

The front end has been set up as a Vite project, i.e. using the following technologies:

- **HTML5**: language creating web pages;
- **JavaScipt**: language making web pages interactive.
- **React**: open source library specialising in the creation of components that segment the site for improved readability and allows components to be reused. 
- **Vite.js**: construction tool for initialising a React/Javascript project to speed up and streamline the creation of a front-end environment. It is initialised with the command `npm create vite@latest`.

In order to reduce site development time and boost performance, some front-end dependencies have been installed: 
- **react-router**: manages navigation between the different pages. this library allows you to change pages without reloading them;
- **axios**: simplifies API calls on the front end.
- **sass**: a css pre-processor that compiles the code and makes it easier to maintain, with functions not available in css languages.



### BACK-END

The back-end is created using the **Node.js** framework, which allows you to create a server in JavaScript.

For the back-end, the application uses the dependencies: 
 - **express**: provides functions to simplify server creation;
 - **sequelize**: links the API to the database and creates data models more easily;
 - **bcryptjs**: hashes the user's password before saving it to the database;
 - **jsonwebtoken**: creates a token when the user logs in, which is then stored in the localStorage;
 - **cors**: enables the API to transmit information to the front end.
 - **multer**: allows images to be uploaded to our server.

## 🚀 Initialising the project

To start the project, we first need to install its dependencies.

Let's start with our back-end!

To do this, we need to open our terminal in the `./App-63/` folder and install the dependencies with the following commands:

````
    cd ./server
    npm install
````


> 🚨 ATTENTION! 🚨  
In order for the server to start correctly, you must ensure that you have the **nodemon** dependency on your computer.
To check that you do, run the command `npm nodemon -v`.   
🟢 If a version text appears, you can simply move on.   
❌ Otherwise run the command line `npm install nodemon`.


Great 🙂!

Our server has its dependencies, we can get it up and running.

To do this, we'll use the command:

```
    npm run dev
```

>🚨 ATTENTION! 🚨  
In order to function correctly, your server needs a file called `.env` which follows the example `./env.example`.

Your `.env` file will contain the following data:
- **PORT**: this will allow you to change the port on which the server is running, the server will run on port 4001 by default.
- **URI_SQL**: this is the link allowing your server to connect to your database, this link will ask for a password from your database manager.
- **JWT_SECRET**: this is an indisputable secret known only to you. This secret is not defined and has no prerequisites, so you must define one by choosing it yourself.

> ℹ️ If your server is running correctly, you should see in your terminal the phrase `Server is running on port` as well as the port used.

Well done 👏!

Your server is now ready, let's move on to the front end.

Now, let's open a new terminal in `./App-63' without closing the old one and execute this lines:



```
    cd client
    npm install
    npm run dev
```
> ℹ️ Go to `http://localhost:5137/` to see the result.


Congratulations 🎉 ! 
Your ‘Le 63’ site is now up and running!
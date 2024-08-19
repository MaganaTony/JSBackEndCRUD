# Backend Javascript Challenge for RESTful API

This project's purpose is to manage users for a database as well as posts. This includes al CRUD verbs as well as authentication via middlewares.

## Here are the technologies the project used:

The project uses Javascript on it's entirety and Node to install packages such as modules


| Technology | Description |
|------------|-------------|
|Node.js| "Node.js is a JavaScript runtime built on Chrome's V8 engine that allows developers to run JavaScript code on the server-side, enabling the creation of fast, scalable, and efficient web applications." |
|Express| "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications, including routing, middleware, and templating."|
|MongoDB| "MongoDB is a NoSQL, document-oriented database that stores data in flexible, JSON-like documents, allowing for easy data storage and retrieval without the need for a predefined schema."|
|Mongoose| "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, providing a straightforward, schema-based solution to model your application data and manage relationships between data, validation, and more."
|JWT| "JWT (JSON Web Token) is a compact, URL-safe token format used for securely transmitting information between parties as a JSON object, commonly used for authentication and authorization in web applications."|
|bcrypt| "bcrypt is a password-hashing function designed to securely hash passwords using a salt, protecting against brute force and rainbow table attacks by making password cracking computationally expensive."|
|http-errors| "http-errors is a utility to create HTTP error objects that include a status code and message, simplifying the process of handling and responding to errors in a web application."|
|dotenv| "dotenv is a zero-dependency module that loads environment variables from a .env file into process.env, allowing you to keep sensitive configuration data separate from your codebase and easily manage environment-specific settings."|


## How do we install it?

First we need to clone the repository on your machine with Git

        git clone `git@github.com:MaganaTony/desafioBackendG34.git`

On the root folder for the project we will need to run

        npm install


## You will need to create a new file .env for all of the variables needed for the code, you can start this off by creating and .env file:

        touch .env

Then copy and paste the code inside the file .`.env.example` inside of the new file but replace the example with your own data

        DB_USER=<TU_USUARIO_DE_BASE_DE_DATOS>
        DB_PASSWORD=<TU_CONTRASEÑA_DE_BASE_DE_DATOS>
        DB_HOST=<HOST_DE_TU_BASE_DE_DATOS>
        DB_NAME=<NOMBRE_DE_TU_BASE_DE_DATOS>
        JWT_SECRET=<TU_SECRETO_DE_JWT>

# Now the routes the API has and how do we make them work?

## Let's start with our users

We will need to create our own users
___

+ POST users/register
  - **This will require a `name`, `email` and `password` as a JSON**

``` js
{
  "name": "Charles",
  "lastName":"Magana",
  "user": "maganatony",
  "avatar": "url goes here",
  "email": "test@gmail.com",
  "password": "admintest"
}

```

+ POST users/login
  - **This will require your `email` and `password` as a JSON**

``` js
{
  "email": "test@gmail.com",
  "password": "admintest"
}

```
- The response will have a token which you will need to copy somwhere safe and it will be valid for `1 day`

+ Now for the posts
 - POST /posts
  - **This will require as a JSON the following:**

``` js
{
  "title": "El test numero 1",
  "content": "Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum",
  "image": "Aqui va un URL"
}
```

- GET /posts
  - You receive all the posts available
  - If you pass a value called search and add a title it will return a post that matches that title if it exists

- PATCH /posts/:id

  - It updates the post you chose
  - `Note:` it will require the token which can be passed down via Auth with Bearer format, copy the token there.

- DELETE /posts/:id
  - It deletes the post
  - `Note:` it will require the token which can be passed down via Auth with Bearer format, copy the token there.


        You may test the API on render.com `https://desafiobackendg34.onrender.com`

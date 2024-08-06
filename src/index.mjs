import express from "express";
// query is used for query parameters
/*Extracts data validated and/or sanitized by express-validator from 
the request, and returns an object with them. */
 import usersRouter from "./routes/users.mjs";
 import {mockUsers} from "./utils/constants.mjs"
 import {resolveIndexUserId} from "./utils/middleware.mjs";

const app = express();
// middleware must be registered b4 a route
// overall the middleware is like a server that let u access the functions etc.
app.use(express.json());
app.use(usersRouter);
// loggingMiddleware will have access to request, responses
// next is function when ur done in middleware
//  built-in function that allows you to output messages or values to the console.
// app.use(loggingMiddleware);
// reference to all put request

const PORT = process.env.PORT || 3000;


// request is if you want to access the http 
// response is to send back data, text or html
// Express body-parser is an npm module used to process data sent in an HTTP request body.
app.get("/",
    //{} another argument if user missing a token. u want to reject by sending back 
    (request, response, next) =>{
        console.log("Base URL 1");
        next()
    }, 
    (request, response, next) =>{
        console.log("Base URL 2");
        next()
    }, 
    (request, response) => {
    response.status(201).send({msg: "Hello"});
});

// /api is the standard
// this is the route to access the file or folder on browser
// request.params gives you route parameters
// 400 is bad request
// this logic has 3 end points
// query is a sort or filtering
// query when you call this the validation chain
// in express when you parsed, it always a string
// when filter and value are undefined
// when value are undefined, it will return to mockUsers
// includes returns true 

app.get("/api/users/:id", resolveIndexUserId, (request, response) =>{
    const {findUserIndex} = request;
    const findUser = mockUsers[findUserIndex];
    if (!findUser) return response.sendStatus(404);
    return response.send(findUser);
    
});

app.get("/api/products", (request, response) => {
    response.send([
        {id: 123, name: "chicken breast", price: "90"}
    ]);
});
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
});


// 400 is invalid
// request body is sending a data
// 201 means created
/* parseInt() function parses a string argument and returns an integer of the specified */ 
/* `` <- this commonly used in string interpolation (to create strings by doing substitution of placeholders)s*/ 
// The res.send() function sends the HTTP response. The body parameter can be a String or a Buffer object or an object or an Array.
/*Use 200 OK for successful read, update, and delete operations. 
Use 201 Created specifically for successful creation operations. */
/*
PUT your updating the entire resource or data or every single field
PATCH is updating the data as partial or portion not the whole/everything data
DELETE 
*/  
import express from "express";
import routes from "./routes/index.mjs"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
// query is used for query parameters
/*Extracts data validated and/or sanitized by express-validator from 
the request, and returns an object with them. */
//  import usersRouter from "./routes/users.mjs";
//  import productsRouter from "./routes/products.mjs"
//  import {mockUsers} from "./utils/constants.mjs"

const app = express();
// middleware must be registered b4 a route
// overall the middleware is like a server that let u access the functions etc.
mongoose.connect("mongodb://localhost/express_tutorial")
.then(() => console.log("Connected to Database"))
.catch(( err)=> console.log(`Error:`)) 

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(routes);
// loggingMiddleware will have access to request, responses
// next is function when ur done in middleware
//  built-in function that allows you to output messages or values to the console.
// app.use(loggingMiddleware);
// reference to all put request

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
});
// request is if you want to access the http 
// response is to send back data, text or html
// Express body-parser is an npm module used to process data sent in an HTTP request body.
app.get("/", (request, response) => {
    response.cookie("hello", "world", { maxAge: 60000 * 60,
        signed: true, sameSite: "none",  secure: true});
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
/*cookies or http cookies
http the server doesnt know who that request coming from 
when you use cookies you can use to get back the server and server will
know the user is */
// cookie parser is a middleware
// cookie can be authentication and authorization
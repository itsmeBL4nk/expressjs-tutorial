import{ Router} from "express";
import { query, validationResult, checkSchema, matchedData

} from "express-validator";
import { mockUsers } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import { resolveIndexUserId} from "../utils/middleware.mjs";
import { User} from "../utils/mongoose/schemas/user.js";

const router =  Router();

router.get("/api/users",
query('filter').isString().
notEmpty()
.withMessage("Must not be empty").
isLength({min: 3, max: 10})
.withMessage("Must be atlease 3-10 characters"),
 (request, response) => {
    // validationResult will the grab field and extract validation error
    const result = validationResult(request);
    console.log(result)
    const {query:{filter,value},
} = request;
    if (!filter && !value)
        return response.send(mockUsers);
    if(filter && value) return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
    );
    return response.send(mockUsers);
/* ...body is to take all the fields in body object and 
unpack to this new object creating to assigned to new users*/ 
}
);
router.get(
    "/api/users/:id", resolveIndexUserId, (request, response) =>{
    const {findUserIndex} = request;
    const findUser = mockUsers[findUserIndex];
    if (!findUser) return response.sendStatus(404);
    return response.send(findUser);   
});

router.post("/api/users", 
    checkSchema(createUserValidationSchema),
    async (request, response) =>{
    const result = validationResult(request);
        if(!result.isEmpty()) return response.status(400).send(result.array());

    const data = matchedData(request);
    console.log(data);
    /*this construction pass in the object (body) contain all the field 
    parang table data sa database */ 
    const newUser = User(data);
    try {
        const savedUser = await newUser.save();
        return response.status(201).send(savedUser)
    } catch (err) {
        console.log(err);
        return response.sendStatus(400);
    }
});
// router.post("/api/users", checkSchema(createUserValidationSchema), 
    
//     (request, response) =>{
//     const  result = validationResult(request);
//     console.log(result);
// // if result is not empty
// // it gets the validation as an array
//     if(!result.isEmpty())
//         return response.status(400).send({errors: result.array()});
//     // this will all your data
//     // matchedData is the validated data
//     const data = matchedData(request);

//     /* it will return true if there are no errors
//     if there errors it will return false */ 
//     // result.isEmpty();
//     /* const newUser = {id: mockUsers[mockUsers.length - 1]
//         .id + 1, ...request.body}; */ 
//     const newUser = {id: mockUsers[mockUsers.length - 1]
//         .id + 1, ...data};
        
//         mockUsers.push(newUser);
//     return response.status(201).send(newUser);
// });
// body is to contain the data that using to update the data
// isNan is not a number
// put request must put the all value even though ur updating a singel value
// put override the data
router.put("/api/users/:id", resolveIndexUserId,(request, response) =>{
    const {
        body, findUserIndex} = request;
        // findUser use to access that were trying to update
        mockUsers[findUserIndex] = {id: mockUsers[findUserIndex].id, ...body};
        return response.sendStatus(200);

});

router.patch("/api/users/:id", resolveIndexUserId, (request, response) =>{
    const {
        body, findUserIndex} = request;
        /*... or spread operator  allows us to quickly copy all or part of an existing
         array or object into another array or object.*/ 
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body};
    return response.sendStatus(200);

});

router.delete("/api/users/:id", resolveIndexUserId, (request, response) => {
    const{ findUserIndex} = request;
    // splice()get the index of the user that trying to removed
    //test
    mockUsers.splice(findUserIndex, 1);
    return response.sendStatus(200);
});
export default router;
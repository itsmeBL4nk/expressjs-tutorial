import {Router} from "express";
import {validationResult, checkSchema, matchedData

} from "express-validator";
import { createProductValidationSchema } from "../utils/validationSchemas.mjs";
import { Product} from "../utils/mongoose/schemas/products.js";

const router = Router();
router.get("/api/mongoProducts", async (request, response)=>{
    try {
        const items = await Product.find();
        return response.send(items); 
    } catch (error) {
        console.log(error);
    }
});
router.post("/api/mongoProducts", 
    checkSchema(createProductValidationSchema),
    async (request, response) =>{
    const result = validationResult(request);
        if(!result.isEmpty()) return response.status(400).send(result.array());

    const data = matchedData(request);
    console.log(data);
    const newUser = Product(data);
    try {
        const savedProducts = await newUser.save();
        return response.status(201).send(savedProducts)
    } catch (err) {
        console.log(err);
        return response.sendStatus(400);
    }
});

// router.get("/api/products", (request, response) => {
//     console.log(request.headers.cookie);
//     console.log(request.cookies);
//     console.log(request.signedCookies.hello);
//     if(
//         request.signedCookies.hello && request.signedCookies.hello === "world"
//     )
//     return response.send([ {id: 123, name: "chicken breast", price: "90"}
//     ]);
//     return response.status(403).send({msg: "Sorry. You need the correct cookie"})
// });

export default router;
import{ Router} from "express";
import { query, validationResult, checkSchema, matchedData

} from "express-validator";

import { Address} from "../utils/mongoose/schemas/address.js";
import { Client} from "../utils/mongoose/schemas/clients.js";
import { createAddressValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();

router.get("/api/address", async (request, response)=>{
    try {
        const clients = await Client.findbyId();
        return response.send(clients); 
    } catch (error) {
        console.log(error);
    }
});
router.post("/api/address", 
    checkSchema(createAddressValidationSchema),
    async (request, response) =>{
    const result = validationResult(request);
        if(!result.isEmpty()) return response.status(400).send(result.array());

    const data = matchedData(request);
    console.log(data);
    const newAddress = Address(data);
    try {
        const savedAddress = await newAddress.save();
        return response.status(201).send(savedAddress)
    } catch (err) {
        console.log(err);
        return response.sendStatus(400);
    }
});

export default router;
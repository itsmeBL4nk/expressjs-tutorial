import{ Router} from "express";
import { query, validationResult, checkSchema, matchedData

} from "express-validator";
import { createCLientValidationSchema } from "../utils/validationSchemas.mjs";
import { Client} from "../utils/mongoose/schemas/clients.js";
import { Address} from "../utils/mongoose/schemas/address.js";

const router = Router();

router.get("/api/clients", async (req, res)=> {
      try {
        const clients = await Client.find().populate("address");
        return res.send(clients); 
      } catch (error) {
        console.log(error);
      }  
});

// create new client
router.post("/api/clients", 
    checkSchema(createCLientValidationSchema),
    async (request, response) =>{
    const result = validationResult(request);
    if(!result.isEmpty()) return response.status(400).send(result.array());

    const data = matchedData(request);
    const newAddress = Address(data.address);
    try {
        const savedAddress = await newAddress.save();
        const client = Client({
            "name": request.body.name,
            "age": request.body.age,
            "email": request.body.email,
            "address": savedAddress._id,
        });
        
        const savedClients = await client.save();
        return response.status(201).send(savedClients);
        // console.log(client);
    } catch (err) {
        console.log(err);
        return response.sendStatus(400);
}

});


export default router;
// router.post("/api/:clientId/address", async (req, res)=>{
//     const {clientId} = req.params;
//     const post = new Address({
//         ...req.body,
//         typeClient: clientId
//     });
//     try {
//         const client = await Client.findById(clientId);
//         if(!client){
//             return res.status(404).send("Client not found");
//         }
//         await post.save();
//         client.address.push(address);
//         await userId.save();
//         res.status(201).send(address);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

    //     if(!result.isEmpty()) return response.status(400).send(result.array());

    // const data = matchedData(request);
    // console.log(data);
    // const newClient = Client(data);
    // try {
    //     const savedClients = await newClient.save();
    //     return response.status(201).send(savedClients)
    // } catch (err) {
    //     console.log(err);
    //     return response.sendStatus(400);
    // }s


// dating get nf client

// router.get("/api/clients", async (request, response)=>{
    
//     try {
//         const clients = await Client.find();
//         return response.send(clients); 
//     } catch (error) {
//         console.log(error);
//     }
// });
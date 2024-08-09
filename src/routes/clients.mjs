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
router.put("/api/clients/:id", checkSchema(createCLientValidationSchema),
    async (req, res)=>{
    const result = validationResult(req);
    if(!result.isEmpty()) return res.status(400).send(result.array());

    const clientId = req.params.id;
    const updatedData = req.body;
    const client = await Client.find({_id: clientId});
   if(client.length === 0){
        return res.status(404).send({error: "Client does not exist"});
    }
    const addressId = client[0].address;
    const updateAddress = await Address.findByIdAndUpdate(addressId, updatedData.address,{
                new:true,
                runValidators:true
            });
            try {
                
                const updatedClientAdd = await Client.findOneAndUpdate(
                    {_id: clientId },
                    {$set: 
                    {
                    "name": req.body.name,
                    "age": req.body.age,
                    "email": req.body.email,
                    "address": updateAddress._id
                    }
                },
                {new:true}
            ).populate("address");
                return res.status(201).send(updatedClientAdd);
            } catch (err) {
                console.log(err);
                return res.sendStatus(400);
            }
});
router.delete("/api/clients/:id", async (req, res)=> {
    const clientId = req.params.id;
    const client = await Client.find({_id: clientId});
    // optional chain .?
    // address??null is like a else sa if
    const addressId = client[0]?.address??null;
    // console.log(addressId);
try {
        if (addressId)
        {
            await Address.findByIdAndDelete(
                addressId);
        }
        // await Address.deleteOne({client: clientId});
        await Client.findByIdAndDelete(clientId);
        return res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ err: 'An error occurred.'+ err});
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


// // UPDATE CLIENT

// router.put("/api/clients/:id", async (req, res)=>{
//     const clientId = req.params.id;
//     const updates = req.body;
//     try {
//         const updatedClient = await Client.findByIdAndUpdate(clientId, updates,{
//             new:true,
//             runValidators:true
//         });
//         if(!updatedClient){
//             return res.status(404).send({error: "Client does not exist"});
//         }
//         if (updates.address){
//             const addressUpdates = {
//                 "street": updates.street,
//                 "city": updates.city,
//                 "zip": updates.zip
//             };
//             await Address.update(addressUpdates,{
//                 where: {_id: updates.address}
//             });      
//         }
        
//         res.send(updatedClient);
    
//         } catch (error) {
//             res.status(500).send({error:error.message});
        
//     }
   
   
//     // try {
//     //     const id = req.params.id;
//     //     const updatedData = req.body;
//     //     const client = await Client.findByIdAndUpdate(id, updatedData, { new: true });
         
//     //     if(client){
//     //         res.status(200).send(client);
//     //     }else{
//     //         req.status(400).send({message: "Client not found"});
//     //     }
//     // } catch (error) {
//     //     res.status(500).send({message:"  Error updating Client", error});
        
//     // }
// });

// CRUDE FOR CLIENT
// {
//   "name": "bannie",
//   "age": "223",
//   "email": "bannniehindiok",
//      "address": {
//        "street": "sto.Iriga",
//        "city": "nabua",
//        "zip": "9090922"
//      }
// }
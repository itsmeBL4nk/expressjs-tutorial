import{ Router} from "express";
import { query, validationResult, checkSchema, matchedData

} from "express-validator";

import { Address} from "../utils/mongoose/schemas/address.js";
import { Client} from "../utils/mongoose/schemas/clients.js";
import { createAddressValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();

export default router;
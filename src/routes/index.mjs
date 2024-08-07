import { Router} from "express";
// this is barrel file
import userRouter from "./users.mjs";
import productsRouter from "./products.mjs"

const router = Router();
// you can use middleware here the same way in app
// for all the router 
router.use(userRouter);
router.use(productsRouter);

export default router;
import { Router } from "express";

import { productsRoutes } from "./productsRoutes";

const routes = Router();
routes.use("/products", productsRoutes);

export { routes };

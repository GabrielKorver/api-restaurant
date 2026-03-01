import { Router } from 'express'

import { productsRoutes } from './productsRoutes'
import { tablesRoutes } from './tablesRoutes'
import { tableSessionsRoutes } from './tableSessionsRoutes'

const routes = Router()
routes.use('/products', productsRoutes)
routes.use('/tables', tablesRoutes)
routes.use('/table-sessions', tableSessionsRoutes)

export { routes }

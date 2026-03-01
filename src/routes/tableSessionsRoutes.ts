import { Router } from 'express'
import { TableSessionsController } from '@/controller/tableSessionsController'

const tableSessionsRoutes = Router()
const tableSessionsController = new TableSessionsController()

tableSessionsRoutes.get('/', tableSessionsController.index)
tableSessionsRoutes.post('/', tableSessionsController.create)
tableSessionsRoutes.put('/:id', tableSessionsController.update)
tableSessionsRoutes.delete('/:id', tableSessionsController.delete)

export { tableSessionsRoutes }

import { NextFunction, Request, Response } from 'express'
import { knex } from '@/database/knex'
import { z } from 'zod'

class TableSessionsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const tableSessions = await knex('table_sessions')
        .join('tables', 'table_sessions.table_id', 'tables.id')
        .select(
          'table_sessions.id',
          'table_sessions.table_id',
          'tables.table_number',
          'table_sessions.opened_at',
          'table_sessions.closed_at',
        )

      return response.json(tableSessions)
    } catch (error) {
      next(error)
    }
  }
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      })
      const { table_id } = bodySchema.parse(request.body)

      const sessionOpened = await knex<TableSessionsRepository>('table_sessions')
        .where('table_id', table_id)
        .whereNull('closed_at')
        .first()

      if (sessionOpened) {
        return response
          .status(400)
          .json({ message: 'There is already an open session for this table' })
      }

      await knex('table_sessions').insert({ table_id, opened_at: knex.fn.now() })
      return response.status(201).json({ message: 'Table session created successfully' })
    } catch (error) {
      next(error)
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params

      const tableSession = await knex('table_sessions').where('id', id).first()

      if (!tableSession) {
        return response.status(404).json({
          message: 'Table session not found',
        })
      }

      if (tableSession.closed_at) {
        return response.status(400).json({
          message: 'Table session is already closed',
        })
      }

      await knex('table_sessions').where('id', id).update({
        closed_at: knex.fn.now(),
      })

      return response.json({
        message: 'Table session closed successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params
      const tableSessions = await knex('table_sessions').where('id', id).first()
      if (!tableSessions) {
        return response.status(404).json({ message: 'Table session not found' })
      }
      await knex('table_sessions').where('id', id).delete()
      return response.json({ message: 'Table session deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}

export { TableSessionsController }

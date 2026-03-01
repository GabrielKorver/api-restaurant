import { Request, Response, NextFunction } from 'express'
import { knex } from '@/database/knex'
import { z } from 'zod'

class TablesController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { table_number } = request.query
      const table = await knex<TableRepository>('tables')
        .select()
        .whereLike('table_number', `%${table_number ?? ''}%`)
        .orderBy('table_number')
      return response.json(table)
    } catch (error) {
      next(error)
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_number: z.number().gt(0, { message: 'table must be greater than 0' }),
      })

      const { table_number } = bodySchema.parse(request.body)

      const existTable = await knex<TableRepository>('tables')
        .where('table_number', table_number)
        .first()

      if (existTable) {
        return response.status(400).json({ message: 'Table already exists' })
      }

      await knex<TableRepository>('tables').insert({ table_number })

      return response.status(201).json({
        message: 'Table created successfully',
        table: { table_number },
      })
    } catch (error) {
      next(error)
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_number: z
          .number({ message: 'table number is required' })
          .gt(0, { message: 'table must be greater than 0' }),
      })

      const { table_number } = bodySchema.parse(request.body)

      const table = await knex('tables').where('id', request.params.id).first()

      if (!table) {
        return response.status(404).json({ message: 'Table not found' })
      }

      const existTable = await knex('tables')
        .where('table_number', table_number)
        .andWhereNot('id', request.params.id)
        .first()

      if (existTable) {
        return response.status(400).json({ message: 'Table number already exists' })
      }

      await knex('tables').where('id', request.params.id).update({ table_number })

      return response.json({
        message: 'Table updated successfully',
        table: { table_number },
      })
    } catch (error) {
      next(error)
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params
      const table = await knex('tables').where('id', id).first()
      if (!table) {
        return response.status(404).json({ message: 'Table not found' })
      }
      await knex('tables').where('id', id).delete()
      return response.json({ message: 'Table deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}

export { TablesController }

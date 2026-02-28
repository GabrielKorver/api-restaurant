import { NextFunction, Request, Response } from 'express'
import { knex } from '@/database/knex'
import { z } from 'zod'

class ProductsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query
      const product = await knex<ProductsRepository>('products')
        .select()
        .whereLike('name', `%${name ?? ''}%`)
        .orderBy('name')
      return response.json(product)
    } catch (error) {
      next(error)
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string({ message: 'name is required' }).trim().min(6),
        price: z.number().gt(0, { message: 'price must be greater than 0' }),
      })

      const { name, price } = bodySchema.parse(request.body)

      await knex<ProductsRepository>('products').insert({ name, price })

      return response
        .status(201)
        .json({ message: 'Product created successfully', product: { name, price } })
    } catch (error) {
      next(error)
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string({ message: 'name is required' }).trim().min(6),
        price: z.number().gt(0, { message: 'price must be greater than 0' }),
      })
      const { name, price } = bodySchema.parse(request.body)
      await knex('products').where('id', request.params.id).update({ name, price })
      return response.json({ message: 'Product updated successfully', product: { name, price } })
    } catch (error) {
      next(error)
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      await knex('products').where('id', request.params.id).delete()
      return response.json({ message: 'Product deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}

export { ProductsController }

import { Request, Response, NextFunction } from 'express'
type ValidationSchemas = {
  body?: any
  query?: any
  params?: any
}

export const validate = ({ body, query, params }: ValidationSchemas) => (req: Request, res: Response, next: NextFunction) => {
  const errors: Record<string, unknown> = {}

  if (body) {
    const result = body.safeParse(req.body)

    if (!result.success) {
      errors.body = result.error.format()
    } else {
      Object.assign(req.body, result.data)
    }
  }

  if (query) {
    const result = query.safeParse(req.query)

    if (!result.success) {
      errors.query = result.error.format()
    } else {
      Object.assign(req.query, result.data)
    }
  }

  if (params) {
    const result = params.safeParse(req.params)

    if (!result.success) {
      errors.params = result.error.format()
    } else {
      Object.assign(req.params, result.data)
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      error: 'Validation error',
      details: errors,
    })
  }

  next()
}

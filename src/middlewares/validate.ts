import { Request, Response, NextFunction } from 'express'

type ValidationSchemas = {
  body?: any
  query?: any
  params?: any
}

function formatZodErrors(issues: any[]) {
  return issues.map((issue) => ({
    field: issue.path.join('.'),

    message: issue.message,
  }))
}

export const validate =
  ({ body, query, params }: ValidationSchemas) =>
  (req: Request, res: Response, next: NextFunction) => {
    let errors: { field: string; message: string }[] = []

    if (body) {
      const result = body.safeParse(req.body)

      if (!result.success) {
        errors = formatZodErrors(result.error.issues)
      } else {
        Object.assign(req.body, result.data)
      }
    }

    if (query) {
      const result = query.safeParse(req.query)

      if (!result.success) {
        errors = formatZodErrors(result.error.issues)
      } else {
        Object.assign(req.query, result.data)
      }
    }

    if (params) {
      const result = params.safeParse(req.params)

      if (!result.success) {
        errors = formatZodErrors(result.error.issues)
      } else {
        Object.assign(req.params, result.data)
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Validation error',

        details: errors,
      })
    }

    next()
  }

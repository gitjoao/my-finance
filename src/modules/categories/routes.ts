import { Router } from 'express'
import { CategoryController } from './controller'
import { listCategoriesValidation } from './validation'
import { validate } from '../../middlewares/validate'

const router = Router()
const controller = new CategoryController()

router.get('/', validate(listCategoriesValidation), controller.list)

export default router

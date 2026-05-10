import { Router } from 'express'
import { CategoryController } from './controller'
import { validate } from '../../middlewares/validate'
import { listCategoriesValidation } from './validation'

const router = Router()
const controller = new CategoryController()

router.get('/', validate(listCategoriesValidation), controller.list)
router.get('/:id', controller.getById)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

export default router

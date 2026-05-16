import { Router } from 'express'
import { CategoryController } from './controller'
import { validate } from '../../middlewares/validate'
import { createCategoryValidation, listCategoriesValidation, updateCategoryValidation } from './validation'

const router = Router()
const controller = new CategoryController()

router.get('/', validate(listCategoriesValidation), controller.list)
router.get('/:id', controller.getById)
router.post('/', validate(createCategoryValidation), controller.create)
router.put('/:id', validate(updateCategoryValidation), controller.update)
router.delete('/:id', controller.delete)

export default router

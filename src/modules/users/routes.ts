import { Router } from 'express'
import { validate } from '../../middlewares/validate'
import { UserController } from './controller'
import { createUserValidation } from './validation'

const router = Router()
const controller = new UserController()

router.post('/', validate(createUserValidation), controller.create)

export default router

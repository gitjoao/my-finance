import { Router } from 'express'
import { validate } from '../../middlewares/validate'
import { AuthController } from './controller'
import { loginValidation } from './validation'

const router = Router()
const controller = new AuthController()

router.post('/login', validate(loginValidation), controller.login)
router.post('/logout', controller.logout)

export default router

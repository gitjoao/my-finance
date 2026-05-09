import { Router } from 'express'
import { CategoryController } from './controller'

const router = Router()
const controller = new CategoryController()

router.get('/', controller.list)

export default router

import { Router } from 'express'
import { TransactionController } from './controller'
import { validate } from '../../middlewares/validate'
import {
  createTransactionValidation,
  presetValidation,
  updateTransactionValidation,
  listTransactionsValidation
} from './validation'

const router = Router()
const controller = new TransactionController()

router.post('/', validate(createTransactionValidation), controller.create)

router.get('/summary', controller.summary)

router.get('/', validate(listTransactionsValidation), controller.list)

router.get('/:id', controller.findById)

router.put('/:id', validate(updateTransactionValidation), controller.update)

router.delete('/:id', controller.delete)

router.post('/pay-credit-card-bill', controller.payCreditCardBill)

router.post('/preset', validate(presetValidation), controller.createPreset)

export default router

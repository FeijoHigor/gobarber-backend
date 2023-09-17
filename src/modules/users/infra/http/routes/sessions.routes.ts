import { Router } from 'express'
import { container } from 'tsyringe'

const sessionsRouter = Router()
import SessionController from '../controllers/SessionsController'

const sessionController = new SessionController()

sessionsRouter.post('/', sessionController.create)

export default sessionsRouter
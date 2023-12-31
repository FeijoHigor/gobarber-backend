import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import ProfileController from '../controllers/ProfileController'

const profileController = new ProfileController()
const profileRouter = Router()

profileRouter.use(ensureAuthenticated)

profileRouter.get('/', profileController.show)
profileRouter.put('/', profileController.update)

export default profileRouter

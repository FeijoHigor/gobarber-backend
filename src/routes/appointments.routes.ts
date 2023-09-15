import { Router, request, response } from 'express'
import { startOfHour, parseISO } from 'date-fns'

import AppointmentRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

const appointmentsRepository = new AppointmentRepository()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {
    console.log(request.user)

    const appointments = await appointmentsRepository.all()
    console.log(appointments)
    
    return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider, date } = request.body

        const parsedDate = parseISO(date)

        const createAppointment = new CreateAppointmentService(appointmentsRepository)

        const appointment = await createAppointment.execute({
            provider_id: provider,
            date: parsedDate
        })

        return response.json(appointment)
    } catch(err: any) {
        return response.status(400).json({ error: err.message })
    }
})

export default appointmentsRouter
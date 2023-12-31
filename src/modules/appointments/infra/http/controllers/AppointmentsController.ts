import { Request, Response } from "express";
import { parseISO } from 'date-fns'
import { container } from 'tsyringe'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

export default class AppointmentsController {
    public async create(request: Request, response: Response) {
        const { provider, date } = request.body
        const user_id = request.user.id

        const parsedDate = parseISO(date)
    
        const createAppointment = container.resolve(CreateAppointmentService)
    
        const appointment = await createAppointment.execute({
            provider_id: provider,
            user_id,
            date: parsedDate
        })
    
        return response.json(appointment)
    }
}
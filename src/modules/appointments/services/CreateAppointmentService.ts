import { getHours, isBefore, startOfHour } from "date-fns";
import Appointment from "../infra/typeorm/entities/Appointment";
import AppError from "@shared/errors/AppError";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

import { injectable, inject } from 'tsyringe'

interface IRequest {
    provider_id: string
    date: Date
    user_id: string
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) {}

    public async execute({ provider_id, user_id, date }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date)

        if(isBefore(appointmentDate, Date.now())) {
            throw new AppError('You can not create a new appointment on a past date.')
        }

        if(user_id === provider_id) {
            throw new AppError('You can not create an appointment with yourself.')
        }

        if(getHours(date) < 8 || getHours(date) > 17) {
            throw new AppError('You can not create an appointment in the past 8 hours and after 17 hours.')
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate)
    
        if(findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked')
        }
    
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate
        })

        return appointment
    }
}

export default CreateAppointmentService
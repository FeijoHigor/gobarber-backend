import { startOfHour } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface Request {
    provider_id: string
    date: Date
}

class CreateAppointmentService {
    constructor(private appointmentsRepository: AppointmentsRepository) {}

    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const appointmentDate = startOfHour(date)

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate)
    
        if(findAppointmentInSameDate) {
            throw new Error('This appointment is already booked')
        }
    
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        })

        return appointment
    }
}

export default CreateAppointmentService
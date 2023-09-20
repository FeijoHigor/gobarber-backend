import Appointment from "../../infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import { uuid } from "uuidv4";

import { getDate, getMonth, getYear, isEqual } from "date-fns";
import IFindAllInMonthFromProviderDTO from "@modules/appointments/dtos/IFindAllInMonthFromProviderDTO";
import IFindAllInDayFromProviderDTO from "@modules/appointments/dtos/IFindAllInDayFromProviderDTO";

// aqui tem acesso ao banco de dados
class FakeAppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = []

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date))

        return findAppointment
    }
    
    public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment()

        Object.assign(appointment, { id: uuid(), provider_id: { id: provider_id }, date })

        this.appointments.push(appointment)

        return appointment
    }

    public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(appointment => {
            return (
                appointment.provider_id.id === provider_id && 
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            )
        })

        return appointments
    }

    public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(appointment => {
            return (
                appointment.provider_id.id === provider_id && 
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            )
        })

        return appointments 
    }
}

export default FakeAppointmentsRepository
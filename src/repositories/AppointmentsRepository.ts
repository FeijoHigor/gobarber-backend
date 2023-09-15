import Appointment from "../models/Appointment";
import { AppDataSource } from "../database";

// data transfer object
interface CreateAppointmentDTO {
    provider_id: string
    date: Date
}

// aqui tem acesso ao banco de dados
class AppointmentRepository {
    private appointments = AppDataSource.getRepository(Appointment)

    public async all(): Promise<Appointment[]> {
        const appointments = await this.appointments.find();

        return appointments
    }

    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.appointments.findOne({
            where: {
                date 
            },
            relations: ['provider_id']
        })

        return findAppointment || null
    }
    
    public async create({ provider_id, date }: CreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.appointments.create({ provider_id: {id: provider_id}, date })

        this.appointments.save(appointment)

        return appointment
    }
}

export default AppointmentRepository
import Appointment from "../entities/Appointment";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

import { AppDataSource } from "@shared/infra/typeorm";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";

// aqui tem acesso ao banco de dados
class AppointmentRepository implements IAppointmentsRepository {
    private ormRepository = AppDataSource.getRepository(Appointment)

    public async all(): Promise<Appointment[]> {
        const appointments = await this.ormRepository.find();

        return appointments
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: {
                date 
            },
            relations: ['provider_id']
        })

        return findAppointment || undefined
    }
    
    public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id: {id: provider_id}, date })

        this.ormRepository.save(appointment)

        return appointment
    }
}

export default AppointmentRepository
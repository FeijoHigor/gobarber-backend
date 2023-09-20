import { Raw } from 'typeorm'
import Appointment from "../entities/Appointment";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

import { AppDataSource } from "@shared/infra/typeorm";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IFindAllInMonthFromProviderDTO from "@modules/appointments/dtos/IFindAllInMonthFromProviderDTO";
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

// aqui tem acesso ao banco de dados
class AppointmentsRepository implements IAppointmentsRepository {
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
    
    public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id: {id: provider_id}, user: { id: user_id }, date })

        this.ormRepository.save(appointment)

        return appointment
    }

    public async findAllInMonthFromProvider({ month, provider_id, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0')

        const appointments = await this.ormRepository.find({
            where: {
                provider_id: {id: provider_id},
                date: Raw(dateFieldName => 
                    `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
                )
            }
        })

        return appointments
    }

    public async findAllInDayFromProvider({ provider_id, month, day, year }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const parsedDay = String(day).padStart(2, '0')
        const parsedMonth = String(month).padStart(2, '0')

        const appointments = await this.ormRepository.find({
            where: {
                provider_id: {id: provider_id},
                date: Raw(dateFieldName => 
                    `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
                )
            }
        })

        return appointments
    }
}

export default AppointmentsRepository
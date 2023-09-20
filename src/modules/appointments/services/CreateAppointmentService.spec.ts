import AppError from "@shared/errors/AppError";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import CreateAppointmentService from "./CreateAppointmentService";

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)
    })

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2023, 8, 20, 12).getTime()
        })

        const appointment = await createAppointment.execute({
            date: new Date(2023, 8, 20, 13),
            user_id: '123123',
            provider_id: '1'
        })

        expect(appointment).toHaveProperty('id')
        expect(appointment.provider_id.id).toBe('1')
    })

    it('should not be able to create a two appointments on the same time', async () => {
        const appointmentDate = new Date(2023, 8, 21, 11)

        await createAppointment.execute({
            date: appointmentDate,
            user_id: '123123',
            provider_id: 'user'
        })

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                user_id: '123123',
                provider_id: 'user'
            })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new appointment on past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2023, 8, 20, 12).getTime()
        })

        await expect(
            createAppointment.execute({
                provider_id: 'user',
                user_id: '123123',
                date: new Date(2023, 8, 20, 11)
            })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new appointment with the same provider and user', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2023, 8, 20, 12).getTime()
        })

        await expect(
            createAppointment.execute({
                provider_id: '123123',
                user_id: '123123',
                date: new Date(2023, 8, 20, 13)
            })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new appointment before 8hrs and after 17hrs', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2023, 8, 20, 12).getTime()
        })

        await expect(
            createAppointment.execute({
                provider_id: 'provider_id',
                user_id: 'user_id',
                date: new Date(2023, 8, 21, 7)
            })
        ).rejects.toBeInstanceOf(AppError)

        await expect(
            createAppointment.execute({
                provider_id: '123123',
                user_id: '123123',
                date: new Date(2023, 8, 21, 18)
            })
        ).rejects.toBeInstanceOf(AppError)
    })
})

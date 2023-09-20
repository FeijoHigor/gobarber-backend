import "reflect-metadata"

import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ListProviderDayAvailabilityService from "./ListProviderDayAvailabilityService";

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(fakeAppointmentsRepository)
    })

    it('should be able to list the day avalability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2023, 8, 20, 14, 0, 0)
        })

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2023, 8, 20, 15, 0, 0)
        })

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2023, 8, 20, 11).getTime()
        })

        const availability = await listProviderDayAvailabilityService.execute({
            provider_id: 'user',
            day: 20,
            year: 2023,
            month: 9
        })

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 14, available: false },
                { hour: 15, available: false },
                { hour: 16, available: true },
                { hour: 13, available: true },
                { hour: 17, available: true },
            ])
        )
    })
})

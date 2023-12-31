import "reflect-metadata"

import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import ListProviderService from "./ListProvidersService";

import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository
let listProvider: ListProviderService

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        listProvider = new ListProviderService(fakeUsersRepository)
    })

    it('should be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            password: '123456'
        })

        const user2 = await fakeUsersRepository.create({
            name: 'John Tre',
            email: 'john.tre@gmail.com',
            password: '123456'
        })

        const loggedUser = await fakeUsersRepository.create({
            name: 'John Qua',
            email: 'john.qua@gmail.com',
            password: '123456'
        })

        const providers = await listProvider.execute({
            user_id: loggedUser.id
        })

        expect(providers).toEqual([
            user1,
            user2
        ])
    })
})

import "reflect-metadata"

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import ShowProfileService from "./ShowProfileService";

import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository
let showProfile: ShowProfileService

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        showProfile = new ShowProfileService(fakeUsersRepository)
    })

    it('should be able to show the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            password: '123456'
        })

        const profile = await showProfile.execute({
            user_id: user.id
        })

        expect(profile.name).toBe('John Doe')
        expect(profile.email).toBe('john.doe@gmail.com')
    })

    it('should not be able to show the profile from non existing user', async () => {

        

        await expect(
            showProfile.execute({
                user_id: 'nonexistinguserid'
            })
        ).rejects.toBeInstanceOf(AppError)
    })
})

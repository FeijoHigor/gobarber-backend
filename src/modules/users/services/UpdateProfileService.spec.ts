import "reflect-metadata"

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import UpdateUserAvatarService from "./UpdateUserAvatarService";

import UpdateProfileService from "./UpdateProfileService";
import FakeHashProvider from "../providers/fakes/FakeHashProvider";

import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfile: UpdateProfileService

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeHashProvider = new FakeHashProvider()
        updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider)
    })

    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            password: '123456'
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'john.tre@gmail.com',
        })

        expect(updatedUser.name).toBe('John Trê')
        expect(updatedUser.email).toBe('john.tre@gmail.com')
    })

    it('should not be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            password: '123456'
        })

        const user = await fakeUsersRepository.create({
            name: 'Test',
            email: 'test@gmail.com',
            password: '123456'
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'John Doe',
            email: 'john.doe@gmail.com',
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            password: '123456'
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            old_password: '123456',
            password: '123123'
        })

        expect(updatedUser.password).toBe('123123')
    })

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            password: '123456'
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            password: '123456'
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            old_password: 'wrong-password',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to update a non-existing user', async () => {
        await expect(updateProfile.execute({
            user_id: 'non-existing-user',
            name: 'John Doe',
            email: 'john.doe@gmail.com'
        })).rejects.toBeInstanceOf(AppError)
    })
})

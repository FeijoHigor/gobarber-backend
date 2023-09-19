import "reflect-metadata"

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import UpdateUserAvatarService from "./UpdateUserAvatarService";

import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider
let updateUserAvatar: UpdateUserAvatarService

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeStorageProvider = new FakeStorageProvider()
        updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider)
    })

    it('should be able to create a new user', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            password: '123456'
        })

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg'
        })

        expect(user.avatar).toBe('avatar.jpg')
    })

    it('should not be able to update a avatar from non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository()
        const fakeStorageProvider = new FakeStorageProvider()

        const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider)

        await expect(
            updateUserAvatar.execute({
                user_id: 'non-existing-user',
                avatarFileName: 'avatar.jpg'
            })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should delete old avatar when updating new one', async () => {
        const fakeUsersRepository = new FakeUsersRepository()
        const fakeStorageProvider = new FakeStorageProvider()

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

        const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider)

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            password: '123456'
        })

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg'
        })

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar2.jpg'
        })

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
        expect(user.avatar).toBe('avatar2.jpg')
    })
})

import UserApi, { UserPasswordData, UserProfileData, UserProfileDataExtend } from '../api/userApi'
import store from '../core/store'
import { BaseResponse } from '../api/authApi'

const userApi = new UserApi()

class UserController {
    async editUserProfile(data: UserProfileData): Promise<void> {
        try {
            const {status, response} = await userApi.editUserProfile(data)
            if (status === 200) {
                store.setState('userData', response)
            }
        } catch (e) {
            console.error(e)
        }
    }

    async editUserAvatar(data: FormData): Promise<void> {
        try {
            const {response} = await userApi.editUserAvatar(data)
            store.setState('userData.avatar', response.avatar)
        } catch (e) {
            console.error(e)
        }
    }

    async editUserPassword(data: UserPasswordData): Promise<void> {
        try {
            await userApi.editUserPassword(data)
        } catch (e) {
            console.error(e)
        }
    }

    async getUserById(id: string): Promise<void> {
        try {
            await userApi.getUserById(id)
        } catch (e) {
            console.error(e)
        }
    }

    async getUserByLogin(login: string): Promise<BaseResponse<UserProfileDataExtend[]>> {
        return await userApi.getUserByLogin(login)
    }
}

export default UserController

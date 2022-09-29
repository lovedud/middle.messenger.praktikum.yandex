import BaseAPI from './baseApi'
import { RequestOptions } from './types'
import { BaseResponse } from './authApi'

export type UserProfileData = {
    first_name: string
    second_name: string
    display_name: string
    login: string
    email: string
    phone: string
    avatar: string | null
}

export type UserPasswordData = {
    oldPassword: string
    newPassword: string
}

export type UserProfileDataExtend = {
    id: number | null
    avatar: string
} & UserProfileData


class User extends BaseAPI {
    constructor() {
        super()
    }

    editUserProfile(data: UserProfileData): Promise<BaseResponse<UserProfileDataExtend>> {
        const options: RequestOptions = {
            body: data
        }

        return this.http.put(`${this.baseUrl}/user/profile`, options)
    }

    editUserAvatar(data: FormData): Promise<BaseResponse<UserProfileDataExtend>> {
        const options: RequestOptions = {
            body: data
        }

        return this.http.put(`${this.baseUrl}/user/profile/avatar`, options)
    }


    editUserPassword(data: UserPasswordData): Promise<BaseResponse> {
        const options: RequestOptions = {
            body: data
        }

        return this.http.put(`${this.baseUrl}/user/password`, options)
    }


    getUserById(id: string): Promise<BaseResponse<UserProfileDataExtend>> {
        const options: RequestOptions<{ id: string }> = {
            data: { id }
        }

        return this.http.get(`${this.baseUrl}/user/${id}`, options)
    }

    getUserByLogin(login: string): Promise<BaseResponse<UserProfileDataExtend[]>> {
        const options: RequestOptions = { body: { login } }

        return this.http.post(`${this.baseUrl}/user/search`, options)
    }
}

export default User
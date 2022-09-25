import BaseAPI from './baseApi'
import { RequestOptions } from './types'
import { UserProfileDataExtend } from './userApi'

export type BaseResponse<R = {}> = {
    id: number
    response: R
    status: number
}

export type SignUpData = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export type SignInData = {
    login: string
    password: string
}

class Auth extends BaseAPI {
    constructor() {
        super()
    }

    signIn(data: SignInData): Promise<BaseResponse> {
        const options: RequestOptions<SignInData> = { body: data }
        return this.http.post(`${this.baseUrl}/auth/signin`, options)
    }

    signUp(data: SignUpData): Promise<BaseResponse> {
        const options: RequestOptions<SignUpData> = { body: data }
        return this.http.post(`${this.baseUrl}/auth/signup`, options)
    }

    getUserInfo(): Promise<BaseResponse<UserProfileDataExtend>> {
        return this.http.get(`${this.baseUrl}/auth/user`)
    }

    logout(): Promise<BaseResponse> {
        return this.http.post(`${this.baseUrl}/auth/logout`)
    }
}

export default Auth
import Router  from '../core/Router'
import AuthApi, { SignInData, SignUpData } from '../api/authApi'
import store from '../core/store'

const authApi = new AuthApi()
const router = new Router("#app");

class AuthController {
    async signIn(data: SignInData): Promise<void> {
        console.log(data);
        try {
            const {status} = await authApi.signIn(data)

            if (status === 200) {
                await this.getUserInfo()
                router.go('/main')
            }
        } catch (e) {
            console.error(e)
        }
    }

    async signUp(data: SignUpData): Promise<void> {
        try {
            await authApi.signUp(data)
            router.go('/main')
        } catch (e) {
            console.error(e)
        }
    }

    async getUserInfo(): Promise<any> {
        try {
            const {status, response} = await authApi.getUserInfo()

            if (status === 200) {
                store.setState('userData', response)
                store.setState('isAuth', true)
            }

            return store.getState().isAuth
        } catch (e) {
            console.error(e)
        }
    }

    async logout(): Promise<void> {
        try {
            await authApi.logout()
            router.go('/')
        } catch (e) {
            console.error(e)
        }
    }
}

export default AuthController
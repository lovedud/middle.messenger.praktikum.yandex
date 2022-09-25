import ChatsAPI from '../api/chatsApi'
import Socket from '../core/socket'
import store from '../core/store'
import UserController from './user'

const chatsApi = new ChatsAPI()
const userController = new UserController()

class ChatsController {
    private _socket: Socket | null

    constructor() {
        this._socket = null
    }

    async getChats(title = '', limit = 100, offset = 0): Promise<void> {
        try {
            const { status, response } = await chatsApi.getChats({ title, limit, offset })

            if (status === 200) {
                store.setState('chatList', response)
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    async connectSocket(userId: number, chatId: number): Promise<void> {
        try {
            const { response } = await chatsApi.getChatToken(chatId)
            const endpoint = `${userId}/${chatId}/${response.token}`

            this._socket = new Socket(endpoint)
        } catch (error) {
            console.log(error)
        }
    }

    async sendMessage(message: string): Promise<void> {
        try {
            if (this._socket) {
                this._socket.sendMessage(message)
                await this.getChats()
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addChat(chatName: string): Promise<void> {
        try {
            const {status} = await chatsApi.createChat({ title: chatName })
            if (status === 200) {
                await this.getChats()
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteChat(id: string): Promise<void> {
        try {
            const {status} = await chatsApi.deleteChat(id)

            if (status === 200) {
                await this.getChats()
                store.setState('currentChat', null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addUser(chatId: string, userLogin: string): Promise<void> {
        try {
            const {response, status} = await userController.getUserByLogin(userLogin)
            const user = response[0]
            if (status === 200 && user.id) {
                const {status} = await chatsApi.addUserToChat({
                    users: [user.id],
                    chatId: +chatId
                })

                if (status === 200) await this.getChats()
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteUser(chatId: string, userLogin: string): Promise<void> {
        try {
            const {response, status} = await userController.getUserByLogin(userLogin)
            const user = response[0]
            if (status === 200 && user.id) {
                const {status} = await chatsApi.deleteUserFromChat({
                    users: [user.id],
                    chatId: +chatId
                })

                if (status === 200) await this.getChats()
            }
        } catch (error) {
            console.log(error)
        }
    }

}

export default new ChatsController()

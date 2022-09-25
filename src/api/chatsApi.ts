import BaseAPI from './baseApi'
import { RequestOptions } from './types'
import { BaseResponse } from './authApi'

export type Chat = {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
        user: {
            first_name: string,
            second_name: string,
            avatar: string,
            email: string,
            login: string,
            phone: string
        },
        time: string,
        content: string
    }
}

export type ChatParam = {
    offset?: number
    limit?: number
    title?: string
}

export type AddChatUsersData = {
    users: number[]
    chatId: number
}

export type DeleteChatData = {
    userId: number,
    result: {
        id: number,
        title: string,
        avatar: string
    }
}

export type DeleteChatUsersData = AddChatUsersData


class Chats extends BaseAPI {
    public constructor() {
        super()
    }

    getChats(data: ChatParam): Promise<BaseResponse<Chat[]>> {
        const options: RequestOptions<ChatParam> = { data }
        return this.http.get(`${this.baseUrl}/chats`, options)
    }

    createChat(data: { title: string }): Promise<BaseResponse<{reason: string}>> {
        const options: RequestOptions<{ title: string }> = { body: data }
        return this.http.post(`${this.baseUrl}/chats`, options)
    }

    deleteChat(chatId: string): Promise<BaseResponse<DeleteChatData>> {
        return this.http.delete(`${this.baseUrl}/chats`, {body: { chatId: chatId } })
    }

    addUserToChat(data: AddChatUsersData): Promise<BaseResponse<{reason: string}>> {
        const options: RequestOptions<AddChatUsersData> = { body: data }
        return this.http.put(`${this.baseUrl}/chats/users`, options)
    }

    deleteUserFromChat(data: DeleteChatUsersData): Promise<BaseResponse<{reason: string}>> {
        const options: RequestOptions<DeleteChatUsersData> = { body: data }
        return this.http.delete(`${this.baseUrl}/chats/users`, options)
    }

    getChatToken(id: number): Promise<BaseResponse<{token: string}>> {
        return this.http.post(`${this.baseUrl}/chats/token/${id}`)
    }

}

export default Chats
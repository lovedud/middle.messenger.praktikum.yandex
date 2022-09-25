import store from './store'
import { WEBSOCKET_CHATS_URL } from '../api/baseApi'

export default class Socket {
    private _socket
    private _timeout: any

    constructor(endpoint: string) {
        this._socket = new WebSocket(`${WEBSOCKET_CHATS_URL}${endpoint}`)
        this._timeout = undefined

        this._socket.addEventListener('open', () => {
            clearInterval(this._timeout)
            this.ping()
            this.getMessages('0')
        })

        this._socket.addEventListener('message', (event: MessageEvent) => {
            const data = JSON.parse(event.data)
            if (data
                && data.type !== 'error'
                && data.type !== 'pong'
                && data.type !== 'user connected'
            ) {

                if (Array.isArray(data)) {
                    store.setState('currentChat.messages', data)
                } else {
                    store.setState('currentChat.messages', [
                        ...store.getState().currentChat?.messages, data
                    ])
                }
            }
        })

        this._socket.addEventListener('close', (event: CloseEvent) => {
            if (event.wasClean) {
                store.setState('currentChat.messages', [])
            } else {
                console.error('Соединение прервано')
            }
            console.warn(`Закрытие соединения: ${event.reason}`)
        })

        this._socket.addEventListener('error', (error: Event) => {
            console.error(`Ошибка: ${error}`)
        })
    }

    ping(): void {
        this._timeout = setInterval(() => {
            this._socket.send(JSON.stringify({
                type: 'ping'
            }))
        }, 3000)
    }

    getMessages(count: string): void {
        this._socket.send(
            JSON.stringify({
                content: count,
                type: 'get old',
            })
        )
    }

    sendMessage(message: string): void {
        this._socket.send(
            JSON.stringify({
                content: message,
                type: 'message',
            })
        )
    }
}

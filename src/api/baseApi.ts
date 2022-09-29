import HTTPTransport from '../core/HttpTransport'

export const WEBSOCKET_CHATS_URL = 'wss://ya-praktikum.tech/ws/chats/'
export const BASE_URL_RESOURCES = 'https://ya-praktikum.tech/api/v2/resources/'
export const BASE_URL = 'https://ya-praktikum.tech/api/v2'

class BaseAPI {
    http: HTTPTransport
    baseUrl: string

    constructor() {
        this.http = new HTTPTransport()
        this.baseUrl = 'https://ya-praktikum.tech/api/v2'
    }
}

export default BaseAPI
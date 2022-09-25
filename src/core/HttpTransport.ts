import { RequestOptions } from '../api/types'

enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

const queryStringify = (data: Record<string, any>): string => {
    return '?' + Object.keys(data).map((key) => key + '=' + data[key]).join('&')
}

export default class HttpTransport {

    get<T>(url: string, options: RequestOptions = {}): Promise<T> {
        const params = queryStringify(options.data ?? {})
        return this._request(url + params, { ...options, method: Methods.GET }, options.timeout)
    }

    sendMethod<T>(method: Methods, url: string, options: RequestOptions = {}): Promise<T> {
        return this._request(url, { ...options, method }, options.timeout)
    }

    put = this.sendMethod.bind(this, Methods.PUT)
    post = this.sendMethod.bind(this, Methods.POST)
    delete = this.sendMethod.bind(this, Methods.DELETE)

    _request = <T>(url: string, options: RequestOptions = {}, timeout = 4000): Promise<T> => {
        const { headers = {}, method, credentials, body } = options

        return new Promise((resolve, reject) => {
            if (!method) {
                reject(`Не валидный метод: ${method}?`)
                return
            }

            const xhr = new XMLHttpRequest()
            xhr.open(method, url)

            if (!(body instanceof FormData)) {
                xhr.setRequestHeader('content-type', 'application/json')
            }

            if (Object.keys(headers).length) {
                Object.keys(headers).forEach((key) => {
                    xhr.setRequestHeader(key, headers[key])
                })
            }

            xhr.withCredentials = true
            if (credentials !== undefined) {
                xhr.withCredentials = credentials
            }

            xhr.responseType = 'json'
            xhr.onload = () => resolve(xhr as any)
            xhr.onabort = () => reject(new Error('some error'))
            xhr.onerror = () => reject(new Error('some error'))
            xhr.timeout = timeout
            xhr.ontimeout = reject

            if (method === Methods.GET || !body) {
                xhr.send()
            } else {
                body instanceof FormData
                    ? xhr.send(body)
                    : xhr.send(JSON.stringify(body))
            }
        })
    }
}

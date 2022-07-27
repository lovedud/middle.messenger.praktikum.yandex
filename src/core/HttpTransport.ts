import queryStringify from "../utils/queryStringify";

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

type Options = {
    headers?: any,
    data?: string,
    method?: string,
    timeout?: number,
}

/**
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */


export class HTTPTransport {
    get = (url: string, options: Options = {}) => {
        let data = '';
        if (options.data)
            data = queryStringify(options.data);

        return this.request(url, { ...options, method: METHODS.GET, data }, options.timeout);
    };

    put = (url: string, options: any = {}) => this.request(url, {...options, method: METHODS.PUT}, options.timeout);

    post = (url: string, options: any = {}) => this.request(url, {...options, method: METHODS.POST}, options.timeout);

    delete = (url: string, options: any = {}) => this.request(url, {...options, method: METHODS.DELETE}, options.timeout);

    request(url: string, options: Options, timeout: number = 5000): Promise<XMLHttpRequest> {
        const { method, data, headers } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            if (options.method !== 'GET') {
                xhr.open(options.method as string, url);
            }
            else {
                xhr.open(options.method, url + data);
            }

            if (headers) {
                Object.keys(headers).forEach((key) => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            xhr.timeout = timeout;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }
}

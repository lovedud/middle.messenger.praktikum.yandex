export type RequestOptions<T = {}, D = {}> = {
    method?: string
    timeout?: number
    credentials?: boolean
    mode?: string
    headers?: Record<string, string>
    data?: D
    body?: T
}
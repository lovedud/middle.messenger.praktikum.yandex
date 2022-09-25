import {  UserProfileDataExtend } from '../api/userApi'
import { set } from '../utils/common'
import EventBus from "./event-bus";

export type HTMLElementEvent<T extends HTMLElement> = Event & {
    target: T;
}

export type RegularObject<T = any> = Record<string, T>

interface CurrentChat {
    messages?: any[]
    chat?: {id: string, title: string}
}

export interface AppState {
    isAuth: boolean
    chatList: any[]
    currentChat: CurrentChat | null
    userData: UserProfileDataExtend & { avatarPreview: string }
}

enum StoreEvent {
    EVENT_UPDATE = 'store-update'
}

class Store extends EventBus {
    static _instance: Store
    private _state = {
        isAuth: false,
        chatList: [],
        userData: {},
        currentChat: null
    }

    constructor() {
        if (Store._instance) return Store._instance
        super()

        Store._instance = this
    }

    getState(): any {
        return this._state
    }

    setState(path: string, value: any): void {
        set(this._state, path, value)
        this.emit(StoreEvent.EVENT_UPDATE)
    }
}

export default new Store()

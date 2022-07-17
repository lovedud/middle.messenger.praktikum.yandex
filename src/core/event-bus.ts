type Handler = (...args: unknown[]) => void;

export default class EventBus {

    private listeners: Record<string, Array<Handler>>;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: Handler) {
        //Код здесь
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: string, callback: Handler) {
        if (!this.listeners[event]) {
            //throw new Error(`Нет события: ${event}`);
            return;
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event: string, ...args: unknown[]) : void {
        if (!this.listeners[event]) {
            //throw new Error(`Нет события: ${event}`);
            return;
        }

        this.listeners[event].forEach(listener => {
            listener(...args);
        });
    }
}

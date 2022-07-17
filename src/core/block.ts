import EventBus from "./event-bus";
import { v4 as uuidv4 } from 'uuid';
import { template } from "handlebars";

export default class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    public id = uuidv4();

    private _element : HTMLElement | null = null;
    private _meta : { props: any } | null = null;

    protected props: any;
    protected children: Record<string, Block | Block[]>;
    protected eventBus: () => EventBus;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */

    constructor(propsAndChildren: any = {}) {
        const eventBus = new EventBus();
        const { children, props } = this._getChildren(propsAndChildren);
        this.children = children;


        this._meta = {
            props
        };

        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;

        this.initChildren();
        this.initProps();

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    protected initChildren(){

    };

    protected initProps(){

    };

    _getChildren(propsAndChildren: any) {
        const children: Record<string, Block | Block[]> = {};
        const props: any = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if(Array.isArray(value) && value.every(v => (v instanceof Block))) {
                children[key] = value;
            } else {
                props[key]  = value;
            }
        });

        return { children, props };
    }

    protected compile(template: (context: any) => string, context: any) : DocumentFragment {

        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

        Object.entries(this.children).forEach(([key, child]) => {
            if(Array.isArray(child)) {
                context[key] = child.map(ch => {
                    return `<div data-id="id-${ch.id}"> </div>`;
                })
            }
            else
                context[key] = `<div data-id="id-${child.id}"> </div>`;
        })

        const htmlString = template(context);

        const htmlStringNoCommas = htmlString.replace(/>,</g, '><');

        fragment.innerHTML = htmlStringNoCommas;

        Object.entries(this.children).forEach(([key, child]) => {
            if(Array.isArray(child)) {
                child.forEach(ch => {
                    const stub = fragment.content.querySelector(`[data-id="id-${ch.id}"]`);
                    if (!stub)
                        return;
                    stub.replaceWith(ch.getContent() as Node);
                })
            }
            else {
                const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

                if (!stub)
                    return;

                stub.replaceWith(child.getContent()  as Node);
            }
        })


        return fragment.content;
    }

    _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount() {
    }

    dispatchComponentDidMoun() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM)
    }

    _componentDidUpdate(oldProps: any, newProps: any) {
        if (this.componentDidUpdate(oldProps, newProps)){
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
        };
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: any, newProps: any) {
        return true;
    }

    setProps = (nextProps : any) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const fragment = this.render();

        let newElement: HTMLElement;

        if (fragment.children.length > 1){
            // создаем <div>, вешаем на него события и ниже апендим прицепом потомков
            newElement = document.createElement('div');
        } else {
            newElement = fragment.firstElementChild as HTMLElement;
        }

        if(this.props.className){
            const classes = (this.props.className as string).split(' ');
            classes.forEach(cl => {
                newElement.classList.add(cl);
            });
        }

        if(this._element){
            this._removeEvents();
            this._element.replaceWith(newElement);
            this._element.innerHTML = '';
            this._element = newElement;
        }
        else {
            this._element = newElement;
        }


        if (fragment.children.length > 1){
            // апендим чайлдов к диву
            const len: number = fragment.children.length;
            for (let i = 0; i < len; i++){
                this._element.append(fragment.children[0]);
            }
        }

        this._addEvents();

    }

    // Может переопределять пользователь, необязательно трогать
    protected render() : DocumentFragment {
        return new DocumentFragment();
    }

    getContent() : HTMLElement | null {
        return this.element;
    }

    _makePropsProxy(props: any) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props as unknown as object, {
            get(target: Record<string, unknown>, prop: string){
                const value = target[prop]
                return typeof value === 'function' ? value.bind(target) : value
            },
            set(target: Record<string, unknown>, prop: string, value: unknown){
                const oldProps = {...target}
                target[prop] = value
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target)
                return true;
            },
            deleteProperty(){
                throw new Error('Нет доступа');
            },
        });
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    protected _removeEvents(){

        const events: Record<string, () => void> = (this.props as any).events;

        if(!events){
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element!.removeEventListener(event, listener);
        })
    }

    protected _addEvents(){

        const events: Record<string, () => void> = (this.props as any).events;

        if(!events){
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element!.addEventListener(event, listener);
        })
    }

    show() {
        this.getContent()!.style.display = "block";
    }

    hide() {
        this.getContent()!.style.display = "none";
    }
}

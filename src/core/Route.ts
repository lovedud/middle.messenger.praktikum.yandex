import { renderDom } from './renderDom';
import Block from "./block";
import {Pathname} from "./Router";

type Props = { rootQuery: string }


class Route {
    public pathname: Pathname

    private readonly _block: Block

    private _props: Props

    private init = false

    public isProtected: boolean

    constructor(pathname: Pathname, view: Block, props: Props, isProtected: boolean) {
        this.pathname = pathname;
        this._block = view;
        this._props = props;
        this.isProtected = isProtected
    }

    navigate(pathname: Pathname): void {
        if (pathname === this.pathname) {
            this.pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        this._block.hide();
    }

    render(): void {
        if (!this.init) {
            renderDom(this._props.rootQuery, this._block);
            this.init = true
            return;
        }

        this._block.show();
        renderDom(this._props.rootQuery, this._block);
    }
}

export default Route
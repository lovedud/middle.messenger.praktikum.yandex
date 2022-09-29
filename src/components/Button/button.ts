import Block from "../../core/block";
import template from "./button.hbs"
import compile from "../../utils/compile";

interface ButtonProps{
    label: string;
    className: string;
    pathname?: string;
    events?: {
        click?: (e?: any) => void
    }
}

export class Button extends Block{
    constructor(props: ButtonProps){
        super('div', props);
    }

    render() {
        return compile(template, { ...this.props });
    }
}

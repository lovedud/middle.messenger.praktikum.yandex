import Block from "../../core/block";
import template from "./input.hbs"

interface InputProps{
    value?: string,
    className?: string,
    inputType?: string,
    pattern?: string,
    inputPlaceholder?: string,
    events?: {
        click?: (e?: any) => void,
        input?: (e?: InputEvent) => void,
        blur?: (e?: Event) => void,
    }
}

export class Input extends Block{
    constructor(props: InputProps){
        super( props);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

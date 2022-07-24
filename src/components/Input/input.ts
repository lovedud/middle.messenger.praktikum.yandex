import Block from "../../core/block";
import template from "./input.hbs"
import compile from "../../utils/compile";

interface InputProps{
    name?: string,
    className?: string,
    type?: string,
    pattern?: string,
    placeholder?: string,
    value?: string,
    disabled?: boolean,
    events?: {
        click?: (e?: Event) => void,
        change?: (e?: InputEvent) => void,
        blur?: (e?: Event) => void,
    }
}

export class Input extends Block<InputProps>{
    public constructor(props: InputProps){
        super( 'div', props);
    }

    render() {
        return compile(template, {...this.props});
    }
}

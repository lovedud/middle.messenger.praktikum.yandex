import Block from "../../core/block";
import template from "./customInput.hbs"
import compile from "../../utils/compile";

interface CustomInputProps{
    name?: string,
    className?: string,
    type?: string,
    pattern?: string,
    placeholder?: string,
    value?: string,
    disabled?: string,
    events?: {
        click?: (e?: Event) => void,
        change?: (e?: InputEvent) => void,
        blur?: (e?: Event) => void,
    }
}

export class CustomInput extends Block<CustomInputProps>{
    public constructor(props: CustomInputProps){
        super( 'div', props);
    }

    render() {
        return compile(template, {...this.props});
    }
}

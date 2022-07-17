import Block from "../../core/block";
import template from "./label.hbs"

interface LabelProps{
    value?: string,
    className?: string,
}

export class Label extends Block{
    constructor(props: LabelProps){
        super( props);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

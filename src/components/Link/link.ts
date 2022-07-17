import Block from "../../core/block";
import template from "./link.hbs"

interface LinkProps{
    link: string,
    text: string,
    className?: string,
    events?: {
        click?: (e: Event) => void,
        focus?: (e: Event) => void,
    },
}

export class Link extends Block{
    constructor(props: LinkProps){
        super(props);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

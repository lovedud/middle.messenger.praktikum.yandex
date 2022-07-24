import Block from "../../core/block";
import template from "./link.hbs"
import compile from "../../utils/compile";

interface LinkProps{
    link: string,
    text: string,
    className?: string,
    events?: {
        click?: (e: Event) => void,
        focus?: (e: Event) => void,
    },
}

export class Link extends Block<LinkProps>{
    public constructor(props: LinkProps){
        super('div', props);
    }

    render() {
        return compile(template, {...this.props});
    }
}

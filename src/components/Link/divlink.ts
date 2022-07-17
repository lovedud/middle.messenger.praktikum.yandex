import Block from "../../core/block";
import template from "./divlink.hbs"

interface LinkProps{
    link: string,
    text: string,
    className?: string,
    events?: {
        click?: () => void,
        focus?: (e: Event) => void,
    },
}

export class DivLink extends Block{
    constructor(props: LinkProps){
        super(props);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

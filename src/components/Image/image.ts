import Block from "../../core/block";
import template from "./image.hbs"
import compile from "../../utils/compile";

interface ImageProps{
    src: string;
    className?: string;
    events?: {
        click?: (e?: Event) => void
    }
}

export class Image extends Block<ImageProps>{
    public constructor(props: ImageProps){
        super('div', props);
    }

    render() {
        return compile(template, {...this.props});
    }
}

import Block from "../../core/block";
import template from "./chatParent.hbs";

interface ChatParentProps{
    chatId: number,
    className?: string,
    events?:{
        click?: () => void;
    }
}

export class ChatParent extends Block{
    constructor(props: ChatParentProps){


        super( {...props});
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        return true;
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

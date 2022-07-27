import Block from "../../core/block";
import template from "./chatParent.hbs";
import compile from "../../utils/compile";

interface ChatParentProps{
    chatId: number,
    className?: string,
    events?:{
        click?: () => void;
    }
}

export class ChatParent extends Block<ChatParentProps>{
    public constructor(props: ChatParentProps){
        super( "div", {...props});
    }

    render() {
        return compile(template, {...this.props});
    }
}

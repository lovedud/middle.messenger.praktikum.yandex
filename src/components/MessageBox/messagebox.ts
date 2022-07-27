import "./messagebox.less";
import Block from "../../core/block";
import template from "./messagebox.hbs";
import compile from "../../utils/compile";

interface MessageBoxProps{
    isActive: string,
    chatId: number,
    break?: Block,
    className?: string,
    userImage?: Block,
    userName?: string,
    numUnreadMessages?: number,
    events?:{
        click?: () => void;
    }
}

export class MessageBox extends Block<MessageBoxProps>{
    public constructor(props: MessageBoxProps){
        super('div', props);
    }

    render() {
        return compile(template, {...this.props});
    }
}

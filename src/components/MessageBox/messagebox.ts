import "./messagebox.less";
import Block from "../../core/block";
import template from "./messagebox.hbs";

interface MessageBoxProps{
    "is-active": string,
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

export class MessageBox extends Block{
    constructor(props: MessageBoxProps){
        super( props);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

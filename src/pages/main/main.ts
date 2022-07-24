import "./main.less"
import template from './main.hbs'
import Block from "../../core/block";
import compile from "../../utils/compile";
import {Link} from "../../components/Link/link";
import {Input} from "../../components/Input/input";
import {ChatParent} from "../../components/ChatParent/chatParent";

export default class MainPage extends Block{
    constructor(props: any) {
        super(props);
    }

    render() {
        const LinkProfile = new Link({
            link: "/",
            text: "Профиль >",
            className: "main__link-profile",
        })

        const InputFind = new Input({
            className: "text-field-input__find",
            type: "text",
            placeholder: "Поиск",
        })

        const ChatParentComponent = new ChatParent({
            chatId: 0,
            className: "main__right-area",
        })

        return compile(template, {
            linkProfile: LinkProfile,
            inputFind: InputFind,
            chatParent: ChatParentComponent,
            messageBoxes: []
        });
    }
}

import "./main.less"
import template from './main.hbs'
import Block from "../../core/block";
import compile from "../../utils/compile";
import {Link} from "../../components/Link/link";
import {ChatParent} from "../../components/ChatParent/chatParent";
import {CustomInput} from "../../components/CustomInput/customInput";
import {MessageBox} from "../../components/MessageBox/messagebox";

class MainPage extends Block{
    constructor() {
        super('div', {

        });
    }

    render() {
        const LinkProfile = new Link({
            link: "/",
            text: "Профиль >",
            className: "main__link-profile",
        })

        const InputFind = new CustomInput({
            className: "text-field-input__find",
            type: "text",
            placeholder: "Поиск",
        })

        const ChatParentComponent = new ChatParent({
            chatId: 0,
            className: "main__right-area",
        })

        const MessageBoxComponent = new MessageBox({
            isActive: 'true',
            chatId: 1,
            userName: 'Ivan',
            numUnreadMessages: 6,
        })

        return compile(template, {
            linkProfile: LinkProfile,
            inputFind: InputFind,
            chatParent: ChatParentComponent,
            messageBoxes: MessageBoxComponent,
        });
    }
}

const mainPage = new MainPage();

export default mainPage;

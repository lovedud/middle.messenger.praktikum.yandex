import "./main.less"
import template from './main.hbs'
import Block from "../../core/block";
import compile from "../../utils/compile";
import {Link} from "../../components/Link/link";
import {ChatParent} from "../../components/ChatParent/chatParent";
import {CustomInput} from "../../components/CustomInput/customInput";
import {MessageBox} from "../../components/MessageBox/messagebox";
import store, { AppState } from '../../core/store';
import chatsController from '../../controllers/chats';

class MainPage extends Block{
    constructor() {
        super('div', {

        });
    }

    handleChat(e: Event): void {
        const target = e.currentTarget as HTMLElement
        const { userData, chatList } = store.getState()

        if (target.hasAttribute('data-chat-id')) {
            const chatId = Number(target.getAttribute('data-chat-id'))
            const currentChat = chatList.find((chat: any) => chat.id === chatId)

            const userId = userData.id

            if (chatId && userId) {
                store.setState('currentChat.chat', currentChat)
                chatsController.connectSocket(userId, chatId)
            }
        }
    }

    initListeners(): void {
        this._element.querySelectorAll('.chat').forEach(chat => {
            chat.addEventListener('click', this.handleChat)
        })
    }

    async componentDidMount(): Promise<void> {
        await chatsController.getChats()
        this.initListeners()
    }

    componentDidUpdate(): void {
        this.initListeners()
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
            isActive: true,
            chatId: 0,
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

import avatar from "../../static/images/avatar.png"

type Chat = typeof chats[0];
type User = typeof state.user;
type FormData = typeof formData;

const chats = [
    {
        chatId: 1,
        chatName: 'Андрей',
        chatAvatar: avatar,
        from: [
            {
                time: new Date(2022, 5, 19, 9, 0),
                text: "Привет!",
                read: true,
            },
            {
                time: new Date(2022, 5, 19, 9, 10),
                text: "Как дела?",
                read: true,
            },
            {
                time: new Date(2022, 5, 19, 9, 20),
                text: "Чем занимаешься?",
                read: true,
            },
            {
                time: new Date(2022, 5, 20, 10, 20),
                text: "Звучит интригующе.",
                read: false,
            },
            {
                time: new Date(2022, 5, 20, 10, 40),
                text: "Завтра приезжай в офис, расскажешь.",
                read: false,
            },

        ],
        to: [
            {
                time: new Date(2022, 5, 19, 9, 5),
                text: "Привет!",
            },
            {
                time: new Date(2022, 5, 19, 9, 15),
                text: "Все норм",
            },
            {
                time: new Date(2022, 5, 19, 9, 16),
                text: "Порядок вроде...",
            },
            {
                time: new Date(2022, 5, 19, 9, 25),
                text: "Вчера, на работе, я пытался выровнять блочный элемент по правому краю. Такая задача встречается не часто, но даже когда она встречается, я использую inline-block или float, но можно обойтись без них. Способ, о котором я расскажу, вам вероятно знаком. Одним из первых у верстальщиков встает вопрос о выравнивании элементов. Часто это центрирование блочных элементов через margin. Но я никогда не видел, чтобы кто-то использовал margin для выравнивания по правому краю.",
            },
        ]
    },
    {
        chatId: 2,
        chatName: 'Работа',
        chatAvatar: avatar,
        from: [
            {
                time: new Date(2022, 5, 18, 9, 0),
                text: "Приглашаем на семинар!",
                read: true,
            },
            {
                time: new Date(2022, 5, 18, 9, 10),
                text: "Пойдете?",
                read: true,
            },
            {
                time: new Date(2022, 5, 20, 9, 11),
                text: "К большому сожалению, многосторонняя проработка вопроса продемонстрировала неготовность к принятию сегодня соглашения в рамках достигнутых ранее договорённостей.",
                read: false,
            },
        ],
        to: [
            {
                time: new Date(2022, 5, 18, 9, 15),
                text: "Ага, спасибо",
            },
            {
                time: new Date(2022, 5, 18, 9, 16),
                text: "Сегодня чет лень...",
            },
        ]
    }
];

const dummyChat: Chat = {
    chatId: 0,
    chatName: 'Нет названия',
    chatAvatar: avatar,
    from: [],
    to: [],
};

chats.push(dummyChat);

const state = {
    user: {
        login: "admin",
        password: "",
        password2: "",
        email: "ivan@yandex.ru",
        firstName: "Ivan",
        lastName: "Ivanov",
        chatName: "Bad-Boy",
        tel: "",
    },
    chats,
    findChatById(id: number): Chat {
        const result: Chat = state.chats.find(chat => chat.chatId === id);
        return (result ? result : dummyChat);
    },
    numUnreadMessagesById(id: number): number {
        const chat: Chat = state.chats.find(chat => chat.chatId === id);
        if (!chat) return 0;

        let foundUnread = 0;

        chat.from.forEach(mes => {
            if (mes.read === false) foundUnread++;
        });
        return foundUnread;
    }
};

export const formData = {
    loginData: {
        get login() {
            return state.user.login;
        },
        get password() {
            return state.user.password;
        }
    },
    signinData: {
        get email() {
            return state.user.email;
        },
        get login() {
            return state.user.login;
        },
        get firstName() {
            return state.user.firstName;
        },
        get lastName() {
            return state.user.lastName;
        },
        get tel() {
            return state.user.tel;
        },
        get password() {
            return state.user.password;
        },
        get password2() {
            return state.user.password2;
        },
    },
    profileData: {
        get email() {
            return state.user.email;
        },
        get login() {
            return state.user.login;
        },
        get firstName() {
            return state.user.firstName;
        },
        get lastName() {
            return state.user.lastName;
        },
        get chatName() {
            return state.user.chatName;
        },
        get tel() {
            return state.user.tel;
        },
    },
};

export default state;

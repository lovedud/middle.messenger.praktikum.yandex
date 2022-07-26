import "./profile.less"
import template from './profile.hbs'
import Block from "../../core/block";
import {Button} from "../../components/Button/button";
import {Input} from "../../components/Input/input";
import {Link} from "../../components/Link/link";
import compile from "../../utils/compile";
import {regExpInput} from "../../utils/regExps";


export default class Profile extends Block{
    constructor() {
        super('div', {
            value: '',
            regExp:  regExpInput.regExp,
            error: false,
            login: '',
            password: '',
        });
    }

    onSubmit = (e) => {
        console.log('Sign Up')
    }

    onBlur(e) {
        console.log('onBlur')
        const errorLogin = document.getElementById('error');
        if (e.target.value.match(this.props.regExp)) {
            errorLogin.textContent = regExpInput.regMassage;
        } else {
            errorLogin.textContent = '';
        }
    }

    onFocus(e) {
        console.log('onFocus')
        const errorLogin = document.getElementById('error');
        if (e.target.value.match(this.props.regExp)) {
            errorLogin.textContent = regExpInput.regMassage;
        } else {
            errorLogin.textContent = '';
        }
    }

    render(): DocumentFragment {
        const ChangeData = new Button({
            label: 'Изменить данные',
            className: 'profile__button',
            events: {
                click: (e: Event) => this.onSubmit(e),
            },
        });
        const ChangePassword = new Button({
            label: 'Изменить пароль',
            className: 'profile__button',
            events: {
                click: (e: Event) => this.onSubmit(e),
            },
        });

        const LoginInput = new Input({
            placeholder: 'Логин',
            name: 'login',
            type: 'text',
            value: this.props.login,
            disabled: true,
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e : Event) => this.onFocus(e),
            }
        });

        const PasswordInput = new Input({
            placeholder: 'Пароль',
            name: 'psssword',
            type: 'password',
            value: this.props.psssword,
            disabled: true,
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e : Event) => this.onFocus(e),
            }
        });

        const PasswordRepeatInput = new Input({
            placeholder: 'Пароль',
            name: 'psssword_repeat',
            type: 'text',
            value: this.props.psssword_repeat,
            disabled: true,
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e : Event) => this.onFocus(e),
            }
        });

        const FirstNameInput = new Input( {
            placeholder: 'First Name',
            name: 'first_name',
            type: 'text',
            value: this.props.first_name,
            disabled: true,
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e : Event) => this.onFocus(e),
            }
        })

        const LastNameInput = new Input( {
            placeholder: 'Last Name',
            name: 'last_name',
            type: 'text',
            value: this.props.last_name,
            disabled: true,
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e : Event) => this.onFocus(e),
            }
        })

        const EmailInput = new Input( {
            placeholder: 'Email',
            name: 'email',
            type: 'text',
            value: this.props.email,
            disabled: true,
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e : Event) => this.onFocus(e),
            }
        })

        const LinkBack = new Link({
            link: '/login',
            text: 'Назад',
            className: 'profile__link'
        })

        return compile(template, {
            buttonChangeData: ChangeData,
            buttonChangePassword: ChangePassword,
            title: "Профиль",
            loginInput: LoginInput,
            passwordInput: PasswordInput,
            passwordRepeatInput: PasswordRepeatInput,
            firstNameInput: FirstNameInput,
            lastNameInput: LastNameInput,
            emailInput: EmailInput,
            link: LinkBack,
        });
    }
}

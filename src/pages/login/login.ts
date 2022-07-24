import "./login.less"
import Block from "../../core/block";
import template from './login.hbs'
import {Input} from "../../components/Input/input";
import { Button } from "../../components/Button/button";
import compile from "../../utils/compile";
import {Link} from "../../components/Link/link";

export default class Login extends Block {
    constructor() {
        super('div', {
            value: '',
            re:  /[^a-zA-ZА-Яа-я0-9]+/g,
            error: false,
            login: '',
            password: '',
        });
    }

    onSubmit = (e) => {
        e.preventDefault()
        const formElement = this.element.getElementsByTagName('input')
        const formData = {}
        for (let element of formElement) {
            formData[element.name] = element.value
        }
        console.log('Input Value', formData);
        this.onFocus(e)
        this.onBlur(e)
    }

    onBlur(e) {
        console.log('onBlur')
        const errorLogin = document.getElementById('errorLogin');
        if (e.target.value.match(this.props.re)) {
            errorLogin.textContent = 'A filename cannot contain any of the following characters: \/:*?"<>|';
        } else {
            errorLogin.textContent = '';
        }
    }

    onFocus(e) {
        console.log('onFocus')
        const errorLogin = document.getElementById('errorLogin');
        if (e.target.value.match(this.props.re)) {
            errorLogin.textContent = 'A filename cannot contain any of the following characters: \/:*?"<>|';
        } else {
            errorLogin.textContent = '';
        }
    }


    render(): DocumentFragment {
        const SubmitButton = new Button({
            label: 'Войти',
            className: 'login__button',
            events: {
                click: (e: any) => this.onSubmit(e),
            },
        });

        const LoginInput = new Input({
            placeholder: 'Логин',
            name: 'login',
            type: 'text',
            value: this.props.login,
            events: {
                change: (e: any) => this.onBlur(e),
                click: (e : any) => this.onFocus(e),
            }
        });

        const PasswordInput = new Input({
            placeholder: 'Пароль',
            name: 'psssword',
            type: 'password',
        });

        const LinkSignUp = new Link({
            link: '/sign-up',
            text: 'Еще не с нами?',
            className: 'login__link'
        })

        return compile(template, {
            button: SubmitButton,
            title: "Вход",
            loginInput: LoginInput,
            passwordInput: PasswordInput,
            link: LinkSignUp,
        });
    }
}

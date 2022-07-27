import "./login.less"
import Block from "../../core/block";
import template from './login.hbs'
import {Input} from "../../components/Input/input";
import { Button } from "../../components/Button/button";
import compile from "../../utils/compile";
import {Link} from "../../components/Link/link";
import {regExpInput} from "../../utils/regExps";

export default class Login extends Block {
    constructor() {
        super('div', {
            value: '',
            regExp: regExpInput.regExp,
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
        if (e.target.value.match(this.props.regExp)) {
            errorLogin.textContent = regExpInput.regMassage;
        } else {
            errorLogin.textContent = '';
        }
    }

    onFocus(e) {
        console.log('onFocus')
        const errorLogin = document.getElementById('errorLogin');
        if (e.target.value.match(this.props.regExp)) {
            errorLogin.textContent = regExpInput.regMassage;
        } else {
            errorLogin.textContent = '';
        }
    }


    render(): DocumentFragment {
        const SubmitButton = new Button({
            label: 'Войти',
            className: 'login__button',
            events: {
                click: (e: Event) => this.onSubmit(e),
            },
        });

        const LoginInput = new Input({
            placeholder: 'Логин',
            name: 'login',
            type: 'text',
            value: this.props.login,
            disabled: false,
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e: Event) => this.onFocus(e),
            }
        });

        const PasswordInput = new Input({
            placeholder: 'Пароль',
            name: 'psssword',
            type: 'password',
            value: this.props.psssword,
            disabled: false,
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

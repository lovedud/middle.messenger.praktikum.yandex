import "./sign-up.less"
import Block from "../../core/block";
import template from './sign-up.hbs'
import {Input} from "../../components/Input/input";
import {Button} from "../../components/Button/button";
import {Link} from "../../components/Link/link";
import compile from "../../utils/compile";
import {regExpInput} from "../../utils/regExps";
import AuthController from "../../controllers/auth";

const authController = new AuthController()

class SignUp extends Block{
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
		e.preventDefault()
		const formElement = this.element.getElementsByTagName('input')
		const formData = {}
		for (let element of formElement) {
			formData[element.name] = element.value
		}
		authController.signUp(formData);
		this.onFocus(e)
		this.onBlur(e)
	}

	onBlur(e) {
		console.log('onBlur')
		const errorLogin = document.getElementById('error');
		if (e.target.value.match(this.props.regExp)) {
			errorLogin.textContent = '';
		} else {
			errorLogin.textContent = '';
		}
	}

	onFocus(e) {
		console.log('onFocus')
		const errorLogin = document.getElementById('error');
		if (e.target.value.match(this.props.regExp)) {
			errorLogin.textContent = '';
		} else {
			errorLogin.textContent = '';
		}
	}

	render(): DocumentFragment {
		const SubmitButton = new Button({
			label: 'Завести аккаунт',
			className: 'signup__button',
			events: {
				click: (e: Event) => this.onSubmit(e),
			},
		});

		const LoginInput = new Input({
			placeholder: 'Логин',
			name: 'login',
			type: 'text',
			value: this.props.login,
			events: {
				change: (e: Event) => this.onBlur(e),
				click: (e : Event) => this.onFocus(e),
			}
		});

		const PasswordInput = new Input({
			placeholder: 'Пароль',
			name: 'password',
			type: 'password',
			value: this.props.password,
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
			events: {
				change: (e: Event) => this.onBlur(e),
				click: (e : Event) => this.onFocus(e),
			}
		})

		const LastNameInput = new Input( {
			placeholder: 'Last Name',
			name: 'second_name',
			type: 'text',
			value: this.props.last_name,
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
			events: {
				change: (e: Event) => this.onBlur(e),
				click: (e : Event) => this.onFocus(e),
			}
		})

		const LinkBack = new Link({
			link: '/login',
			text: 'Назад',
			className: 'signup__link'
		})

		return compile(template, {
			button: SubmitButton,
			title: "Регистрация",
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

const signUp = new SignUp();

export default signUp;


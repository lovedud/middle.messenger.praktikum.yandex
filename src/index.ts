import { Signin, Home, Login, Profile, Main, ErrorPage } from "./pages/index"
import Block from "./core/block";
import { Input } from "./components/Input/input";
import { Button } from "./components/Button/button";
import { Link } from "./components/Link/link";
import { Label } from "./components/Label/label";
import { Image } from "./components/Image/image";
import state from "./core/store";
import {formData} from "./core/store";
import { renderDom } from "./core/renderDom"

import avatar from "../static/images/avatar.png"
import { Break } from "./components/Break/break";
import { MessageBox } from "./components/MessageBox/messagebox";
import { DivLink } from "./components/Link/divlink";
import { ChatParent } from "./components/ChatParent/chatParent";

const pageCreator = {
	indexPages: [
		['404', '404'],
		['500', '500'],
		['Login', 'login'],
		['Signin', 'signin'],
		['Profile', 'profile'],
		['Main', 'main'],
	],
	error404: {
		title: "404",
		message: "Не туда попали",
		link: new Link({
			link: "home",
			text: "Назад к чатам",
		}),
	},
	error500: {
		title: "500",
		message: "Мы уже фиксим",
		link: new Link({
			link: "home",
			text: "Назад к чатам",
		}),
	},
	login: {
		"input-login": new Input({
			className: "inputs-container__input",
			inputType: "text",
			inputPlaceholder: "Логин",
			value: state.user.login,
			events: {
				input: (e) => {
					state.user.login = (e!.target as HTMLInputElement).value;
					const checkResult = checkLogin(state.user.login);
					pageCreator.login["login-helper"].setProps({
						value: checkResult === 'ok' ? `&nbsp;` : checkResult,
					})
				},
			}
		}),
		"label-login": new Label({
			className: "inputs-container__label",
			value: "Логин",
		}),
		"login-helper": new Label({
			className: "text-field__helper",
			value: `&nbsp;`,
		}),
		"input-password": new Input({
			className: "inputs-container__input",
			inputType: "password",
			inputPlaceholder: "Пароль",
			value: state.user.password,
			events: {
				input: (e) => {
					state.user.password = (e!.target as HTMLInputElement).value;
					const checkResult = checkPassword(state.user.password);
					pageCreator.login["password-helper"].setProps({
						value: checkResult === 'ok' ? `&nbsp;` : checkResult,
					});
				},
			}
		}),
		"label-password": new Label({
			className: "inputs-container__label",
			value: "Пароль",
		}),
		"password-helper": new Label({
			className: "text-field__helper",
			value: `&nbsp;`,
		}),
		"login-button": new Button ({
			label: "Авторизоваться",
			className: "login__button-auth",
			events: {
				click: (e) => {
					e!.stopPropagation();
					console.log(formData.loginData);
					console.log(`проверка логина '${formData.loginData.login}' - `,
						checkLogin(formData.loginData.login) != 'ok' ? 'not ok' : 'ok');
					console.log('проверка пароля: ',
						checkPassword(formData.loginData.password) != 'ok' ? 'not ok' : 'ok');
				}
			}
		}),
		"link-no-account": new Link({
			link: "home",
			text: "Нет аккаунта?",
		}),
	},
	signin: {
		"input-email": new Input({
			className: "inputs-container__input",
			inputType: "text",
			inputPlaceholder: "Почта",
			value: state.user.email,
			events: {
				input: (e) => {
					state.user.email = (e!.target as HTMLInputElement).value;
					const checkResult = checkEmail(state.user.email);
					pageCreator.signin["email-helper"].setProps({
						value: checkResult === 'ok' ? `&nbsp;` : checkResult,
					});
				}
			}
		}),
		"label-email": new Label({
			className: "inputs-container__label",
			value: "Почта",
		}),
		"email-helper": new Label({
			className: "text-field__helper",
			value: `&nbsp;`,
		}),
		"input-login": new Input({
			className: "inputs-container__input",
			inputType: "text",
			inputPlaceholder: "Логин",
			value: state.user.login,
			events: {
				input: (e) => {
					state.user.login = (e!.target as HTMLInputElement).value;
					const checkResult = checkLogin(state.user.login);
					pageCreator.signin["login-helper"].setProps({
						value: checkResult === 'ok' ? `&nbsp;` : checkResult,
					});
				}
			}
		}),
		"label-login": new Label({
			className: "inputs-container__label",
			value: "Логин",
		}),
		"login-helper": new Label({
			className: "text-field__helper",
			value: `&nbsp;`,
		}),
		"input-name": new Input({
			className: "inputs-container__input",
			inputType: "text",
			inputPlaceholder: "Имя",
			value: state.user.firstName,
			events: {
				input: (e) => {
					state.user.firstName = (e!.target as HTMLInputElement).value;
					const checkResult = checkName(state.user.firstName);
					pageCreator.signin["name-helper"].setProps({
						value: checkResult === 'ok' ? `&nbsp;` : checkResult,
					});
				}
			}
		}),
		"label-name": new Label({
			className: "inputs-container__label",
			value: "Имя",
		}),
		"name-helper": new Label({
			className: "text-field__helper",
			value: `&nbsp;`,
		}),
		"input-lastname": new Input({
			className: "inputs-container__input",
			inputType: "text",
			inputPlaceholder: "Фамилия",
			value: state.user.lastName,
			events: {
				input: (e) => {
					state.user.lastName = (e!.target as HTMLInputElement).value;
					const checkResult = checkLastname(state.user.lastName);
					pageCreator.signin["lastname-helper"].setProps({
						value: checkResult === 'ok' ? `&nbsp;` : checkResult,
					});
				}
			}
		}),
		"label-lastname": new Label({
			className: "inputs-container__label",
			value: "Фамилия",
		}),
		"lastname-helper": new Label({
			className: "text-field__helper",
			value: `&nbsp;`,
		}),
		"input-tel": new Input({
			className: "inputs-container__input",
			inputType: "tel",
			inputPlaceholder: "Телефон",
			value: state.user.tel,
			events: {
				input: (e) => {
					state.user.tel = (e!.target as HTMLInputElement).value;
					const checkResult = checkTel(state.user.tel);
					pageCreator.signin["tel-helper"].setProps({
						value: checkResult === 'ok' ? `&nbsp;` : checkResult,
					});
				}
			}
		}),
		"label-tel": new Label({
			className: "inputs-container__label",
			value: "Телефон",
		}),
		"tel-helper": new Label({
			className: "text-field__helper",
			value: `&nbsp;`,
		}),
		"input-pass": new Input({
			className: "inputs-container__input",
			inputType: "password",
			inputPlaceholder: "Пароль",
			value: state.user.password,
			events: {
				input: (e) => {
					state.user.password = (e!.target as HTMLInputElement).value;
					const checkResult = checkPassword(state.user.password);
					pageCreator.signin["pass-helper"].setProps({
						value: checkResult === 'ok' ? `&nbsp;` : checkResult,
					});
				}
			}
		}),
		"label-pass": new Label({
			className: "inputs-container__label",
			value: "Пароль",
		}),
		"pass-helper": new Label({
			className: "text-field__helper",
			value: `&nbsp;`,
		}),
		"input-pass2": new Input({
			className: "inputs-container__input",
			inputType: "password",
			inputPlaceholder: "Пароль",
			value: state.user.password2,
			events: {
				input: (e) => {
					state.user.password2 = (e!.target as HTMLInputElement).value;
					const checkResult = checkPassword(state.user.password2);
					if (state.user.password != state.user.password2)
						pageCreator.signin["pass2-helper"].setProps({
							value: "повторный пароль не совпадает",
						});
					else
						pageCreator.signin["pass2-helper"].setProps({
							value: checkResult === 'ok' ? `&nbsp;` : checkResult,
						});
				}
			}
		}),
		"label-pass2": new Label({
			className: "inputs-container__label",
			value: "Пароль еще раз  ",
		}),
		"pass2-helper": new Label({
			className: "text-field__helper",
			value: `&nbsp;`,
		}),
		"signin-button": new Button ({
			label: "Зарегистрироваться",
			className: "signin__button-auth",
			events: {
				click: (e) => {
					e!.stopPropagation();
					console.log('Register clicked');
					console.log(formData.signinData);
					console.log(`проверка почты '${formData.signinData.email}' - `,
						checkEmail(formData.signinData.email) != 'ok' ? 'not ok' : 'ok');
					console.log(`проверка логина '${formData.signinData.login}' - `,
						checkLogin(formData.signinData.login) != 'ok' ? 'not ok' : 'ok');
					console.log(`проверка имени '${formData.signinData.firstName}' - `,
						checkName(formData.signinData.firstName) != 'ok' ? 'not ok' : 'ok');
					console.log(`проверка фамилии '${formData.signinData.lastName}' - `,
						checkLastname(formData.signinData.lastName) != 'ok' ? 'not ok' : 'ok');
					console.log(`проверка телефона '${formData.signinData.tel}' - `,
						checkTel(formData.signinData.tel) != 'ok' ? 'not ok' : 'ok');
					console.log('проверка пароля: ',
						checkPassword(formData.signinData.password) != 'ok' ? 'not ok' : 'ok');
					console.log('проверка повторного пароля: ',
						(checkPassword(formData.signinData.password2) != 'ok' ||
							formData.signinData.password2 != formData.signinData.password) ? 'not ok' : 'ok');
				}
			}
		}),
		"link-no-account": new Link({
			link: "home",
			text: "Войти",
		}),
	},
	profile: {
		"label-firstname": new Label({
			className: "header-logo__txt",
			value: state.user.firstName,
		}),
		"input-email": new Input({
			className: "text-field-wide__input",
			inputType: "email",
			inputPlaceholder: "email",
			value: state.user.email,
			events: {
				input: (e) => {
					state.user.email = (e!.target as HTMLInputElement).value;
					const checkResult = checkEmail(state.user.email);
					pageCreator.profile["helper-email"].setProps({
						value: checkResult === 'ok' ? `&nbsp;` : checkResult,
					});
				}
			}
		}),
		"label-email": new Label({
			className: "text-field-wide__label",
			value: "Почта",
		}),
		"helper-email": new Label({
			className: "text-field__helper",
			value: `&nbsp;`,
		}),
		"input-login": new Input({
			className: "text-field-wide__input",
			inputType: "text",
			inputPlaceholder: "login",
			value: state.user.login,
			events: {
				input: (e) => {
					state.user.login = (e!.target as HTMLInputElement).value;
					const checkResult = checkLogin(state.user.login);
					pageCreator.profile["helper-login"].setProps({
						value: checkResult === 'ok' ? `&nbsp;` : checkResult,
					});
				}
			}
		}),
		"label-login": new Label({
			className: "text-field-wide__label",
			value: "Логин",
		}),
		"helper-login": new Label({
			className: "text-field__helper",
			value: `&nbsp;`,
		}),
		"input-firstname": new Input({
			className: "text-field-wide__input",
			inputType: "text",
			inputPlaceholder: "Имя",
			value: state.user.firstName,
			events: {
				input: (e) => {
					state.user.firstName = (e!.target as HTMLInputElement).value;
					const checkResult = checkName(state.user.firstName);
					pageCreator.profile["helper-firstname"].setProps({
						value: checkResult === 'ok' ? `&nbsp;` : checkResult,
					});
				}
			}
		}),
		"label2-firstname": new Label({
			className: "text-field-wide__label",
			value: "Имя",
		}),
		"helper-firstname": new Label({
			className: "text-field__helper",
			value: `&nbsp;`,
		}),
		"input-lastname": new Input({
			className: "text-field-wide__input",
			inputType: "text",
			inputPlaceholder: "Фамилия",
			value: state.user.lastName,
			events: {
				input: (e) => {
					state.user.lastName = (e!.target as HTMLInputElement).value;
					const checkResult = checkLastname(state.user.lastName);
					pageCreator.profile["helper-lastname"].setProps({
						value: checkResult === 'ok' ? `&nbsp;` : checkResult,
					});
				}
			}
		}),
		"label-lastname": new Label({
			className: "text-field-wide__label",
			value: "Фамилия",
		}),
		"helper-lastname": new Label({
			className: "text-field__helper",
			value: `&nbsp;`,
		}),
		"input-chatname": new Input({
			className: "text-field-wide__input",
			inputType: "text",
			inputPlaceholder: "Имя в чате",
			value: state.user.chatName,
			events: {
				input: (e) => {
					state.user.chatName = (e!.target as HTMLInputElement).value;
					const checkResult = checkChatname(state.user.chatName);
					pageCreator.profile["helper-chatname"].setProps({
						value: checkResult === 'ok' ? `&nbsp;` : checkResult,
					});
				}
			}
		}),
		"label-chatname": new Label({
			className: "text-field-wide__label",
			value: "Имя в чате",
		}),
		"helper-chatname": new Label({
			className: "text-field__helper",
			value: `&nbsp;`,
		}),
		"input-tel": new Input({
			className: "text-field-wide__input",
			inputType: "tel",
			pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
			inputPlaceholder: "Телефон",
			value: state.user.tel,
			events: {
				input: (e) => {
					state.user.tel = (e!.target as HTMLInputElement).value;
					const checkResult = checkTel(state.user.tel);
					pageCreator.profile["helper-tel"].setProps({
						value: checkResult === 'ok' ? `&nbsp;` : checkResult,
					});
				}
			}
		}),
		"label-tel": new Label({
			className: "text-field-wide__label",
			value: "Телефон",
		}),
		"helper-tel": new Label({
			className: "text-field__helper",
			value: `&nbsp;`,
		}),
		"link-changedata": new Link({
			link: "",
			text: "Изменить данные",
			className: "text-field-wide__link_normal",
			events: {
				click: () => {
					console.log('Change data clicked');
					console.log(formData.profileData);
					console.log(`проверка почты '${formData.profileData.email}' - `,
						checkEmail(formData.profileData.email) != 'ok' ? 'not ok' : 'ok');
					console.log(`проверка логина '${formData.profileData.login}' - `,
						checkLogin(formData.profileData.login) != 'ok' ? 'not ok' : 'ok');
					console.log(`проверка имени '${formData.profileData.firstName}' - `,
						checkName(formData.profileData.firstName) != 'ok' ? 'not ok' : 'ok');
					console.log(`проверка фамилии '${formData.profileData.lastName}' - `,
						checkLastname(formData.profileData.lastName) != 'ok' ? 'not ok' : 'ok');
					console.log(`проверка имени в чате '${formData.profileData.chatName}' - `,
						checkChatname(formData.profileData.chatName) != 'ok' ? 'not ok' : 'ok');
					console.log(`проверка телефона '${formData.profileData.tel}' - `,
						checkTel(formData.profileData.tel) != 'ok' ? 'not ok' : 'ok');
				}
			}
		}),
		"break1": new Break({}),
		"link-changepassword": new Link({
			link: "home",
			text: "Изменить пароль",
			className: "text-field-wide__link_normal",
		}),
		"break2": new Break({}),
		"link-exit": new Link({
			link: "home",
			text: "Выйти",
			className: "text-field-wide__link_red",
		}),
	},
	main: {
		"link-profile": new DivLink({
			link: "home",
			text: "Профиль >",
			className: "link-profile",
		}),
		"input-find": new Input({
			className: "text-field-input__find",
			inputType: "text",
			inputPlaceholder: "Поиск",
			value: "",
			events: {
				input: (e) => {
					console.log((e!.target as HTMLInputElement).value);
				}
			}
		}),
		messageBoxes: [],
		chatParent: new ChatParent({
			chatId: 0,
			className: "main__right-area",
		}),
	},
}

let mBoxes: Array<Block> = [];

for (let i = 1; i < 7; i++){

	const newMessageBox = new MessageBox({
		chatId: i,
		"is-active": "active-false",
		break: new Break({}),
		className: "messagebox",
		userName: state.findChatById(i).chatName,
		numUnreadMessages: state.numUnreadMessagesById(i),
		userImage: new Image({
			src: avatar,
			className: "image-user",
		}),
		events: {
			click: () => {
				pageCreator.main.chatParent.setProps({
					"chatId": i
				})
				mBoxes.forEach( item => item.setProps({
					"is-active": "active-false"
				}));
				newMessageBox.setProps({
					"is-active": "active-true"
				});
			}
		},
	});

	mBoxes.push(newMessageBox);
}

(pageCreator.main.messageBoxes as any) = mBoxes;

const router : Record<string, Block> = {
	home: Home(pageCreator.indexPages),
	404: ErrorPage(pageCreator.error404),
	500: ErrorPage(pageCreator.error500),
	login: Login(pageCreator.login),
	signin: Signin(pageCreator.signin),
	profile: Profile(pageCreator.profile),
	main: Main(pageCreator.main),
}

const newWindow = window as any;
newWindow.user = state.user;

const root = renderDom('app', router['home']);

root.addEventListener('click', handler);

function handler(event: Event){
	event.preventDefault();
	const route = (event.target as any).attributes[0]['nodeValue'];
	Object.keys(router).forEach(r => {
		if (r == route){
			renderDom('app', router[route]);
			return;
		}
	})

}

function checkLogin(login: string): string{
	if (login.length < 3)
		return "введите не менее 3х символов";
	else if (login.length > 20)
		return "логин не может превышать 20 символов";
	else if (/^[0-9]+$/i.test(login))
		return "логин не может состоять только из цифр"
	else if(!/^[0-9A-Z-_]+$/i.test(login))
		return "введите логин на латинице без спецсимволов";
	else
		return 'ok';
}

function checkChatname(chatName: string): string{
	if(!/^[0-9A-ZА-Я-_]+$/i.test(chatName))
		return "введите имя в чате без спецсимволов";
	else
		return 'ok';
}

function checkPassword(password: string): string{
	if (password.length < 8)
		return "введите не менее 8 символов";
	else if (password.length > 40)
		return "пароль не может превышать 40 символов";
	else if (!/\d{1}/.test(password))
		return "должна быть хотя бы одна цифра";
	else if(!/[A-ZА-Я]/.test(password))
		return "должна быть хотябы одна заглавная буква";
	else
		return 'ok';
}

function checkEmail(email: string): string{
	if (/[А-Я]/i.test(email))
		return "введите email на латинице";
	else if (!/^(.+)@[A-Z]{1,}\.(.+)$/i.test(email))
		return "email неверного формата";
	else
		return 'ok';
}

function checkName(name: string): string{
	if (!/^[A-ZА-Я]{1}[a-zA-Zа-яА-Я-]*$/.test(name))
		return "имя должно быть с заглавной буквы без спецсимволов и цифр";
	else
		return 'ok';
}

function checkLastname(lastname: string): string{
	if (!/^[A-ZА-Я]{1}[a-zA-Zа-яА-Я-]*$/.test(lastname))
		return "фамилия должна быть с заглавной буквы без спецсимволов и цифр";
	else
		return 'ok';
}

function checkTel(tel: string): string{
	if (tel.length < 10)
		return "введен слишком короткий номер";
	else if (tel.length > 15)
		return "введен слишком длинный номер";
	else if (!/^\+?[0-9]*$/.test(tel))
		return "введите только цифры";
	else
		return 'ok';
}

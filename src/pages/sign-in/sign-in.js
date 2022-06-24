import box from '../../components/box/box.hbs';

export default function signIn() {
	return box({
		title: 'Вход',
		buttonText: 'Войти',
		inputs:
			[
				{
					placeholder: 'Логин',
					name: 'login',
					type: 'text',
				},
				{
					placeholder: 'Пароль',
					name: 'password',
					type: 'password',
				},
			],
		link: {
			linkText: 'Еще не с нами?',
			url: '/sign-up'
		}
	});
};
